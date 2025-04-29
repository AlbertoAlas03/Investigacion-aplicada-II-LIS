import { useState, useEffect } from "react";

const UpdateCoupon = ({ show, onClose, getCupon, updateCupon, cuponSelected, setcuponSelected, updateMonto }) => {

    const [error, setError] = useState(null);
    const [isProcessing, setisProcessing] = useState(false);
    const [monto, setmonto] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setisProcessing(true);
        if (!monto) {
            setError("Porfavor, ingrese el campo requerido");
            setisProcessing(false);
            return;
        }
        const CuponData = {
            codigo: cuponSelected,
            monto: monto
        }
        try {
            const response = await updateCupon(CuponData);
            if (response) {
                alert(response.message);
                setisProcessing(false);
                onClose();
                getCupon();
                setcuponSelected(null);
            }
        } catch (error) {
            console.log(error.message);
            setError(error.message || "Error al actualizar el cupon");
            setisProcessing(false);
        }

    }

    useEffect(() => {
        if (updateMonto) {
            setmonto(updateMonto || '');
        }
    }, [updateMonto]);

    return (
        <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1" style={{ backgroundColor: show ? 'rgba(0,0,0,0.5)' : 'none' }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title"><i className="bi bi-pencil-square"></i> Editar cupón</h5>
                        <button type="button" className="btn-close" onClick={() => {
                            setError(null);
                            setcuponSelected(null);
                            onClose()
                        }}></button>
                    </div>
                    <div className="modal-body">
                        {error && (
                            <div className="alert alert-danger d-flex align-items-center" role="alert">
                                <i className="bi bi-x-circle-fill me-2"></i>
                                {error}
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="mb-3">
                                    <label htmlFor="monto" className="form-label"><i className="bi bi-currency-dollar"></i> Monto</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="$0.00"
                                        value={monto}
                                        disabled={isProcessing}
                                        onChange={(e) => setmonto(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="d-grid mt-3">
                                <button
                                    type="submit"
                                    className="btn btn-success"
                                    disabled={isProcessing}
                                >
                                    {isProcessing ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            <span className="ms-2">Procesando...</span>
                                        </>
                                    ) : (
                                        "Actualizar cupón"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateCoupon