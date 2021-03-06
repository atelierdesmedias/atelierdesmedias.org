/**
 * this is "mainHeader" TS export class
 * follow workflow instructions
 */

// ------------------------------------------------------------------------- IMPORTS

import {DOMView} from '../../helpers/solidify-lib/core/DOMView';
import './MainHeader.scss';
import {MainNav} from '../mainNav/MainNav';
import {HamburgerButton} from '../hamburgerButton/HamburgerButton';
import {gsap} from 'gsap';
import {breakPoint} from '../../helpers/breakPoint';

// States de la mainNav Handler
enum EToggleMainNavHandler {
  OPEN,
  CLOSE,
  TOGGLE
}

// ------------------------------------------------------------------------- START EXPORT CLASS

export class MainHeader extends DOMView {
  // ------------------------------------------------------------------------- LOCALS

  // état de l'ouverture
  private _isOpen = false;

  // ------------------------------------------------------------------------- TYPE

  private _hamburgerButton: HamburgerButton;
  private _mainNav: MainNav;

  // hamburger Button
  private $hamburgerButton: ZeptoCollection;
  private $lineTop: ZeptoCollection;
  private $lineCenter: ZeptoCollection;
  private $lineBottom: ZeptoCollection;
  private $mainNav: ZeptoCollection;

  // ------------------------------------------------------------------------- INIT

  /**
   * prepare nodes
   *
   */
  protected prepareNodes() {
    // ciblier le mainNav
    this.$mainNav = this.$root.find('.MainNav');

    // cibler le hamburger bouton qui se trouve dans ce composant
    this.$hamburgerButton = this.$root.find('.HamburgerButton');
    this.$lineTop = this.$hamburgerButton.find('.HamburgerButton_line-top');
    this.$lineCenter = this.$hamburgerButton.find(
      '.HamburgerButton_line-center'
    );
    this.$lineBottom = this.$hamburgerButton.find(
      '.HamburgerButton_line-bottom'
    );
  }

  
  /**
   * prepare dependencies
   *
   */
  protected prepareDependencies() {
    // importer le hamburger button
    this._hamburgerButton = new HamburgerButton(
      this.$root.find('.HamburgerButton')
    );

    // inclure le main menu
    this._mainNav = new MainNav(this.$root.find('.MainNav'));
  }

  /**
   * prepare events
   *
   */
  protected prepareEvents() {
    // changer l'affichage de la mainNav en function du click hamburger Button
    this.$hamburgerButton.click(() => {
      // passer la methode toggle mainNav avec le param toggle
      this.changeStateMainNavHandler(EToggleMainNavHandler.TOGGLE);
    });

    // reset le state de la mainNav en function du reszie
    // si mobile : le reset est de cacher le mainNav
    // si laptop : le reset est de montrer le mainNav
    $(window).on('resize', this.resetMainNavStateHandler.bind(this));
  }

  /**
   * after Init
   *
   */
  protected afterInit() {}

  // ------------------------------------------------------------------------- HANDLERS

  /**
   * Mobile toggle
   */
  protected changeStateMainNavHandler(pState: EToggleMainNavHandler) {
    if (pState == EToggleMainNavHandler.TOGGLE) {
      // toggle du state
      this._isOpen = !this._isOpen;
    } else if (pState == EToggleMainNavHandler.OPEN) {
      // passer open à true
      this._isOpen = true;
    } else if (pState == EToggleMainNavHandler.CLOSE) {
      // passer open à false (cacher le mainNav)
      this._isOpen = false;
    }

    // animer l'apparition de la mainNav
    this.mainNavAnim();

    // changer l'affichage des lignes du hamburger button
    this.hamburgerButtonLinesAnim();
  }

  /**
   * Reset le state du mainNav
   * si mobile : le reset est de cacher le mainNav
   * si laptop : le reset est de montrer le mainNav
   */
  protected resetMainNavStateHandler() {
    // si plus grand que large
    breakPoint('large')
      ? // monter le mainNav
        this.changeStateMainNavHandler(EToggleMainNavHandler.OPEN)
      : // cacher le mainNav
        this.changeStateMainNavHandler(EToggleMainNavHandler.CLOSE);

    // reset l'apparition de la mainNav sans anim
    this.mainNavAnim(0);
  }

  // ------------------------------------------------------------------------- ANIM

  /**
   * Animer la mainNav en function du state
   */
  protected mainNavAnim(duration = 0.1): void {
    // animer l'apparition
    gsap.to(this.$mainNav, {
      duration,
      autoAlpha: this._isOpen ? 1 : 0
    });
  }

  /**
   * animation des lignes du hamburger Button
   */
  protected hamburgerButtonLinesAnim(duration: number = 0.1): void {
    // animation des "lines" du HamburgerButton
    gsap.to(this.$lineTop, {
      duration,
      rotation: this._isOpen ? 43 : 0,
      top: this._isOpen ? 6 : 0
    });
    gsap.to(this.$lineCenter, {
      duration,
      opacity: this._isOpen ? 0 : 1
    });
    gsap.to(this.$lineBottom, {
      duration,
      rotation: this._isOpen ? -43 : 0,
      bottom: this._isOpen ? 8 : 0
    });
  }

  // ------------------------------------------------------------------------- END EXPORT CLASS
}
