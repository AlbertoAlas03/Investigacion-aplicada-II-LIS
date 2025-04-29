import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const Header = ({ user }) => {

    const navigate = useNavigate();
    const [showLogoutModal, setshowLogoutModal] = useState(false);
    const { logout } = useLogin();

    const handleLogout = async () => {
        try {
            const response = await logout();
            if (response) {
                navigate("/");
            }
        } catch (error) {
            console.log("error al cerrar sesión: ", error);
        } finally {
            setshowLogoutModal(false);
        }
    }

    return (
        <>
            <div className="container">
                <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                    <div className="col-md-3 mb-2 mb-md-0">
                        <h5 className="mb-2 justify-content-center mb-md-0">
                            Estas logueado como un {user?.role}
                        </h5>
                    </div>
                    <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                        <li>
                            <button
                                className="nav-link px-2"
                                onClick={() => setshowLogoutModal(true)}
                            >Cerrar sesión</button>
                        </li>
                    </ul>
                </header>
            </div>

            {
                showLogoutModal && (
                    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Cerrar sesión</h5>
                                    <button type="button" className="btn-close" onClick={() => setshowLogoutModal(false)}></button>
                                </div>
                                <div className="modal-body">¿Estás seguro que deseas cerrar sesión?</div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setshowLogoutModal(false)}>
                                        <i className="bi bi-x"></i> Cancelar
                                    </button>
                                    <button type="button" className="btn btn-danger" onClick={handleLogout}>
                                        <i className="bi bi-box-arrow-left"></i> Cerrar sesión
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Header