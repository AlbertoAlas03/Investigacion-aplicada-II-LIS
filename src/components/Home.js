import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth"
import { replace, useNavigate } from "react-router-dom"
import Header from "./header";
import ReedemCoupon from "./ReedemCoupon";
import useCupon from "../hooks/useCupon";
import AddCoupon from "./AddCoupon";
import UpdateCoupon from "./UpdateCoupon";

const Home = () => {

    const { user } = useAuth();
    const navigate = useNavigate();
    const { getCupon, cupon, deleteCupon, searchCupon, cuponCode, reedemCoupon, addCupon, updateCupon } = useCupon();
    const [showDeleteModal, setshowDeleteModal] = useState(false);
    const [cuponSelected, setcuponSelected] = useState(null);
    const [cuponSearch, setcuponSearch] = useState('');
    const [showReedemModal, setshowReedemModal] = useState(false);
    const [showAddModal, setshowAddModal] = useState(false);
    const [showUpdateModal, setshowUpdateModal] = useState(false);
    const [updateMonto, setupdateMonto] = useState('');

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user, navigate])

    useEffect(() => {
        getCupon();
    }, [])

    const handleDeleteCupon = async (codigo) => {
        try {
            const response = await deleteCupon(codigo);
            if (response) {
                alert("Cupon eliminado con exito");
                getCupon();
                setcuponSelected(null);
                setshowDeleteModal(false);
            }
        } catch (error) {
            console.log("Error al eliminar el cupon: ", error.message);
        }
    }

    const handleSearch = async (codigo) => {
        try {
            const response = await searchCupon(codigo);
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <>
            <Header user={user} />
            <div className="container py-4" style={{ marginBottom: "50px" }}>
                <h2 className="mb-4">Cupones</h2>
                <div className="col col-md-6 d-flex" style={{ marginBottom: '20px' }}>
                    <input
                        type="text"
                        className="form-control me-2"
                        placeholder="Buscar cupones por código..."
                        value={cuponSearch}
                        onChange={(e) => setcuponSearch(e.target.value)}
                    />
                    <button type="button" className="btn btn-primary" onClick={() =>
                        handleSearch(cuponSearch)
                    }>
                        <i className="bi bi-search"></i>
                    </button>
                </div>
                {
                    user?.role === "empleado" ? (
                        <div className="col col-lg-2" style={{ marginBottom: '20px' }}>
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => setshowAddModal(true)}
                            > <i className="bi bi-plus"></i> Agregar cupon</button>
                        </div>
                    ) : (
                        <button
                            type="button"
                            className="btn btn-success"
                            style={{ marginBottom: '20px' }}
                            onClick={() => setshowReedemModal(true)}
                        >
                            <i className="bi bi-receipt"></i> Canjear cupon
                        </button>
                    )
                }
                <div className="row">
                    {
                        cuponCode.length > 0 ? (
                            cuponCode.map((cupon) => (
                                <div className="col-md-4 mb-4" key={cupon.id}>
                                    <div className="card shadow-sm h-100">
                                        <div className="card-body">
                                            <h5 className="card-title text-primary d-flex align-items-center">
                                                <i className="bi bi-upc-scan me-2"></i>
                                                {cupon.codigo}
                                            </h5>
                                            <p className="card-text text-muted">${cupon.monto}</p>

                                            <div className="mb-2">
                                                <strong>Estado:</strong>{" "}
                                                <code className="bg-light px-2 py-1 rounded">{cupon.estado}</code>
                                            </div>

                                            <div className="mb-2">
                                                <strong>Fecha de registro:</strong>{" "}
                                                <code className="bg-light px-2 py-1 rounded">{new Date(cupon.created_at).toLocaleDateString()}</code>
                                            </div>

                                            <div className="mb-2" style={{ marginTop: '10px' }}>
                                                {
                                                    user?.role === "empleado" && (
                                                        <>
                                                            <button
                                                                type="button"
                                                                className="btn btn-danger"
                                                                onClick={() => {
                                                                    setcuponSelected(cupon.codigo)
                                                                    setshowDeleteModal(true)
                                                                }
                                                                }
                                                            >
                                                                <i className="bi bi-trash"></i> Eliminar
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="btn btn-warning"
                                                                style={{ margin: '10px' }}
                                                                onClick={() => {
                                                                    setcuponSelected(cupon.codigo)
                                                                    setshowUpdateModal(true)
                                                                    setupdateMonto(cupon.monto);
                                                                }}
                                                            >
                                                                <i className="bi bi-pencil-square"></i> Editar
                                                            </button>
                                                        </>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            cupon.length > 0 ? (
                                cupon.map((cupon) => (
                                    <div className="col-md-4 mb-4" key={cupon.id}>
                                        <div className="card shadow-sm h-100">
                                            <div className="card-body">
                                                <h5 className="card-title text-primary d-flex align-items-center">
                                                    <i className="bi bi-upc-scan me-2"></i>
                                                    {cupon.codigo}
                                                </h5>
                                                <p className="card-text text-muted">${cupon.monto}</p>

                                                <div className="mb-2">
                                                    <strong>Estado:</strong>{" "}
                                                    <code className="bg-light px-2 py-1 rounded">{cupon.estado}</code>
                                                </div>

                                                <div className="mb-2">
                                                    <strong>Fecha de registro:</strong>{" "}
                                                    <code className="bg-light px-2 py-1 rounded">{new Date(cupon.created_at).toLocaleDateString()}</code>
                                                </div>

                                                <div className="mb-2" style={{ marginTop: '10px' }}>
                                                    {
                                                        user?.role === "empleado" && (
                                                            <>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-danger"
                                                                    onClick={() => {
                                                                        setcuponSelected(cupon.codigo)
                                                                        setshowDeleteModal(true)
                                                                    }
                                                                    }
                                                                >
                                                                    <i className="bi bi-trash"></i> Eliminar
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-warning"
                                                                    style={{ margin: '10px' }}
                                                                    onClick={() => {
                                                                        setcuponSelected(cupon.codigo)
                                                                        setshowUpdateModal(true)
                                                                        setupdateMonto(cupon.monto);
                                                                    }}
                                                                >
                                                                    <i className="bi bi-pencil-square"></i> Editar
                                                                </button>
                                                            </>

                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))

                            ) : (
                                <div className="container-fluid py-5 text-center">
                                    <i className="bi bi-emoji-frown display-1 text-warning mb-4"></i>
                                    <h2 className="fw-bold text-muted">
                                        ¡Ups! parece que no existen cupones
                                    </h2>
                                    <p className="lead text-muted">
                                        Pueda que no existan cupones registrados, lo sentimos.
                                    </p>
                                </div>
                            )
                        )

                    }
                </div>
            </div>
            {
                showDeleteModal && (
                    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Eliminar cupon</h5>
                                    <button type="button" className="btn-close" onClick={() => {
                                        setcuponSelected(null);
                                        setshowDeleteModal(false)
                                    }
                                    }></button>
                                </div>
                                <div className="modal-body">¿Estás seguro que deseas eliminar este cupon?</div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" onClick={() => {
                                        setcuponSelected(null)
                                        setshowDeleteModal(false)
                                    }
                                    }>
                                        <i className="bi bi-x"></i> Cancelar
                                    </button>
                                    <button type="button" className="btn btn-success" onClick={() => handleDeleteCupon(cuponSelected)}>
                                        <i className="bi bi-check2"></i> Aceptar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            <ReedemCoupon
                show={showReedemModal}
                onClose={() => setshowReedemModal(false)}
                reedemCoupon={reedemCoupon}
                getCupon={getCupon}
            />

            <AddCoupon
                show={showAddModal}
                onClose={() => setshowAddModal(false)}
                getCupon={getCupon}
                addCupon={addCupon}
            />

            <UpdateCoupon
                show={showUpdateModal}
                onClose={() => setshowUpdateModal(false)}
                getCupon={getCupon}
                updateCupon={updateCupon}
                cuponSelected={cuponSelected}
                setcuponSelected={setcuponSelected}
                updateMonto={updateMonto}
            />
        </>
    )
}

export default Home