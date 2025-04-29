import { useState } from "react";

const AddCoupon = ({ show, onClose, getCupon, addCupon }) => {
    const [error, setError] = useState(null);
    const [isProcessing, setisProcessing] = useState(false);
    const [code, setCode] = useState('');
    const [monto, setmonto] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setisProcessing(true);
        if (!code || !monto) {
            setError("Porfavor, ingrese los campos requeridos");
            setisProcessing(false);
            return;
        }
        const CuponData = {
            codigo: code,
            monto: monto
        }
        try {
            const response = await addCupon(CuponData);
            if (response) {
                alert(response.message)
                setisProcessing(false);
                onClose();
                getCupon();
                clearForm();
            }
        } catch (error) {
            console.log(error.message);
            setError(error.message);
            setisProcessing(false);
        }
    }

    const clearForm = () => {
        setCode('');
        setmonto('');
    }

    return (
        <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1" style={{ backgroundColor: show ? 'rgba(0,0,0,0.5)' : 'none' }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title"><i className="bi bi-file-earmark-plus"></i> Agregar cupón</h5>
                        <button type="button" className="btn-close" onClick={() => {
                            setError(null);
                            clearForm();
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
                                    <label className="form-label"><i className="bi bi-upc-scan"></i> Código del cupon</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ingrese el código del cupon"
                                        value={code}
                                        disabled={isProcessing}
                                        onChange={(e) => setCode(e.target.value)}
                                    />
                                </div>
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
                                        "Agregar cupón"
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

export default AddCoupon