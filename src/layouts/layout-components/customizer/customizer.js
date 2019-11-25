import React from 'react';
import { connect } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { setLogoBg, setNavbarBg, setSidebarBg, setTheme, setDir, setSidebarPos, setHeaderPos, setLayout, setSidebarType } from '../../../redux/settings/action';


const mapStateToProps = state => ({
    ...state
});
const mapDispatchToProps = dispatch => ({
    setLogoBg: (payload) => dispatch(setLogoBg(payload)),
    setNavbarBg: (payload) => dispatch(setNavbarBg(payload)),
    setSidebarBg: (payload) => dispatch(setSidebarBg(payload)),
    setTheme: (payload) => dispatch(setTheme(payload)),
    setDir: (payload) => dispatch(setDir(payload)),
    setSidebarPos: (payload) => dispatch(setSidebarPos(payload)),
    setHeaderPos: (payload) => dispatch(setHeaderPos(payload)),
    setLayout: (payload) => dispatch(setLayout(payload)),
    setSidebarType: (payload) => dispatch(setSidebarType(payload))
});

class Customizer extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
    }
    componentDidMount() {
        window.addEventListener("load", this.defaultSettings);
    }

    toggle() {
        document.getElementById("customizer").classList.toggle("show-service-panel");
    }
    render() {
        return (
            <aside className="customizer" id="customizer">
                {/*--------------------------------------------------------------------------------*/}
                {/* Toggle Customizer From Here                                                    */}
                {/*--------------------------------------------------------------------------------*/}
                <span className="service-panel-toggle text-white" onClick={this.toggle}><i className="fa fa-spin fa-cog"></i></span>
                <PerfectScrollbar>
                    <div className="customizer-body">
                        <div className="mt-3 border-bottom px-3">
                            <h5 className="font-medium m-0">Cor do tema</h5>
                            <div className="btn-group btn-group-toggle mt-2 mb-3" data-toggle="buttons">
                                <label className={"btn btn-outline-secondary " + (this.props.settings.activeTheme === "light" ? 'active' : '')}>
                                    <input type="radio" name="theme-color" id="theme-light" onClick={() => { this.props.setTheme('light') }} /> Light
                                </label>
                                <label className={"btn btn-outline-secondary " + (this.props.settings.activeTheme === "dark" ? 'active' : '')}>
                                    <input type="radio" name="theme-color" id="theme-dark" onClick={() => { this.props.setTheme('dark') }} /> Dark
                                </label>
                            </div>
                        </div>
                        <div className="mt-3 border-bottom px-3">
                            <h5 className="font-medium m-0">Posição do menu lateral</h5>
                            <div className="btn-group btn-group-toggle mt-2 mb-3" data-toggle="buttons">
                                <label className={"btn btn-outline-secondary " + (this.props.settings.activeSidebarPos === "fixed" ? 'active' : '')}>
                                    <input type="radio" name="sidebar-position" id="sidebar-fixed" onClick={() => { this.props.setSidebarPos('fixed') }} /> Fixa
                                </label>
                                <label className={"btn btn-outline-secondary " + (this.props.settings.activeSidebarPos === "absolute" ? 'active' : '')}>
                                    <input type="radio" name="sidebar-position" id="sidebar-absolute" onClick={() => { this.props.setSidebarPos('absolute') }} /> Flutuante
                                </label>
                            </div>
                        </div>
                        <div className="mt-3 border-bottom px-3">
                            <h5 className="font-medium m-0">Posição do cabeçaho</h5>
                            <div className="btn-group btn-group-toggle mt-2 mb-3" data-toggle="buttons">
                                <label className={"btn btn-outline-secondary " + (this.props.settings.activeHeaderPos === "fixed" ? 'active' : '')}>
                                    <input type="radio" name="header-position" id="header-fixed" onClick={() => { this.props.setHeaderPos('fixed') }} /> Fixo
                                </label>
                                <label className={"btn btn-outline-secondary " + (this.props.settings.activeHeaderPos === "absolute" ? 'active' : '')}>
                                    <input type="radio" name="header-position" id="header-absolute" onClick={() => { this.props.setHeaderPos('absolute') }} /> Flutuante
                                </label>
                            </div>
                        </div>
                        <div className="mt-3 border-bottom px-3">
                            <h5 className="font-medium m-0">Layout</h5>
                            <div className="btn-group btn-group-toggle mt-2 mb-3" data-toggle="buttons">
                                <label className={"btn btn-outline-secondary " + (this.props.settings.activeLayout === "full" ? 'active' : '')}>
                                    <input type="radio" name="theme-layout" id="theme-full" onClick={() => { this.props.setLayout('full') }} /> Full
                                </label>
                                <label className={"btn btn-outline-secondary " + (this.props.settings.activeLayout === "boxed" ? 'active' : '')}>
                                    <input type="radio" name="theme-layout" id="theme-boxed" onClick={() => { this.props.setLayout('boxed') }} /> Boxed
                                </label>
                            </div>
                        </div>
                        <div className="mt-3 border-bottom px-3">
                            <h5 className="font-medium m-0">Direção</h5>
                            <div className="btn-group btn-group-toggle mt-2 mb-3" data-toggle="buttons">
                                <label className={"btn btn-outline-secondary " + (this.props.settings.activeDir === "ltr" ? 'active' : '')}>
                                    <input type="radio" name="theme-dir" id="theme-ltr" onClick={() => { this.props.setDir('ltr') }} /> Esquerda
                                </label>
                                <label className={"btn btn-outline-secondary " + (this.props.settings.activeDir === "rtl" ? 'active' : '')}>
                                    <input type="radio" name="theme-dir" id="theme-rtl" onClick={() => { this.props.setDir('rtl') }} /> Direita
                                </label>
                            </div>
                        </div>
                        <div className="mt-3 border-bottom px-3">
                            <h5 className="font-medium m-0">Tipo do menu lateral</h5>
                            <div className="btn-group btn-group-toggle mt-2 mb-3" data-toggle="buttons">
                                <label className={"btn btn-outline-secondary " + (this.props.settings.activeSidebarType === "full" ? 'active' : '')}>
                                    <input type="radio" name="theme-sidebar" id="sidebar-full" onClick={() => { this.props.setSidebarType('full') }} /> Full
                                </label>
                                <label className={"btn btn-outline-secondary " + (this.props.settings.activeSidebarType === "mini-sidebar" ? 'active' : '')}>
                                    <input type="radio" name="theme-sidebar" id="sidebar-mini" onClick={() => { this.props.setSidebarType('mini-sidebar') }} /> Mini
                                </label>
                                <label className={"btn btn-outline-secondary " + (this.props.settings.activeSidebarType === "iconbar" ? 'active' : '')}>
                                    <input type="radio" name="theme-sidebar" id="sidebar-icon" onClick={() => { this.props.setSidebarType('iconbar') }} /> Icon
                                </label>
                                <label className={"btn btn-outline-secondary " + (this.props.settings.activeSidebarType === "overlay" ? 'active' : '')}>
                                    <input type="radio" name="theme-sidebar" id="sidebar-overlay" onClick={() => { this.props.setSidebarType('overlay') }} /> Overlay
                                </label>
                            </div>
                        </div>
                        <div className="mt-3 border-bottom px-3">
                            {/*--------------------------------------------------------------------------------*/}
                            {/* Change LOGO Background                                                         */}
                            {/*--------------------------------------------------------------------------------*/}
                            <h5 className="font-medium m-0">Logo Backgrounds</h5>
                            <ul className="theme-color mt-2 mb-3">
                                <li className="theme-item"><span className="theme-link" data-logobg="skin1" onClick={() => { this.props.setLogoBg('skin1') }}>&nbsp;</span></li>
                                <li className="theme-item"><span className="theme-link" data-logobg="skin2" onClick={() => { this.props.setLogoBg('skin2') }}>&nbsp;</span></li>
                                <li className="theme-item"><span className="theme-link" data-logobg="skin3" onClick={() => { this.props.setLogoBg('skin3') }}>&nbsp;</span></li>
                                <li className="theme-item"><span className="theme-link" data-logobg="skin4" onClick={() => { this.props.setLogoBg('skin4') }}>&nbsp;</span></li>
                                <li className="theme-item"><span className="theme-link" data-logobg="skin5" onClick={() => { this.props.setLogoBg('skin5') }}>&nbsp;</span></li>
                                <li className="theme-item"><span className="theme-link" data-logobg="skin6" onClick={() => { this.props.setLogoBg('skin6') }}>&nbsp;</span></li>
                            </ul>
                        </div>
                        <div className="mt-3 border-bottom px-3">
                            {/*--------------------------------------------------------------------------------*/}
                            {/* Change NAVBAR Background                                                       */}
                            {/*--------------------------------------------------------------------------------*/}
                            <h5 className="font-medium m-0">Navbar Backgrounds</h5>
                            <ul className="theme-color mt-2 mb-3">
                                <li className="theme-item"><span className="theme-link" data-navbarbg="skin1" onClick={() => { this.props.setNavbarBg('skin1') }}>&nbsp;&nbsp;</span></li>
                                <li className="theme-item"><span className="theme-link" data-navbarbg="skin2" onClick={() => { this.props.setNavbarBg('skin2') }}>&nbsp;</span></li>
                                <li className="theme-item"><span className="theme-link" data-navbarbg="skin3" onClick={() => { this.props.setNavbarBg('skin3') }}>&nbsp;</span></li>
                                <li className="theme-item"><span className="theme-link" data-navbarbg="skin4" onClick={() => { this.props.setNavbarBg('skin4') }}>&nbsp;</span></li>
                                <li className="theme-item"><span className="theme-link" data-navbarbg="skin5" onClick={() => { this.props.setNavbarBg('skin5') }}>&nbsp;</span></li>
                                <li className="theme-item"><span className="theme-link" data-navbarbg="skin6" onClick={() => { this.props.setNavbarBg('skin6') }}>&nbsp;</span></li>
                            </ul>

                        </div>
                        <div className="mt-3 border-bottom px-3">
                            {/*--------------------------------------------------------------------------------*/}
                            {/* Change SIDEBAR Background                                                      */}
                            {/*--------------------------------------------------------------------------------*/}
                            <h5 className="font-medium m-0">Sidebar Backgrounds</h5>
                            <ul className="theme-color mt-2 mb-3">
                                <li className="theme-item"><span className="theme-link" data-sidebarbg="skin1" onClick={() => { this.props.setSidebarBg('skin1') }}>&nbsp;</span></li>
                                <li className="theme-item"><span className="theme-link" data-sidebarbg="skin2" onClick={() => { this.props.setSidebarBg('skin2') }}>&nbsp;</span></li>
                                <li className="theme-item"><span className="theme-link" data-sidebarbg="skin3" onClick={() => { this.props.setSidebarBg('skin3') }}>&nbsp;</span></li>
                                <li className="theme-item"><span className="theme-link" data-sidebarbg="skin4" onClick={() => { this.props.setSidebarBg('skin4') }}>&nbsp;</span></li>
                                <li className="theme-item"><span className="theme-link" data-sidebarbg="skin5" onClick={() => { this.props.setSidebarBg('skin5') }}>&nbsp;</span></li>
                                <li className="theme-item"><span className="theme-link" data-sidebarbg="skin6" onClick={() => { this.props.setSidebarBg('skin6') }}>&nbsp;</span></li>
                            </ul>
                        </div>
                    </div>
                </PerfectScrollbar>
            </aside>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Customizer);
