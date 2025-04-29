import { useState } from "react";

const ReedemCoupon = ({ show, onClose, reedemCoupon, getCupon }) => {

    const [error, setError] = useState(null);
    const [code, setCode] = useState('');
    const [isProcessing, setisProcessing] = useState(false);

    const handleReedemCoupon = async (e) => {
        e.preventDefault();
        setError(null);
        setisProcessing(true)
        if (!code) {
            setError("Porfavor, ingrese el codigo del cupon que desea canjear");
            setisProcessing(false);
            return;
        }
        try {
            const response = await reedemCoupon(code);
            if (response) {
                alert(response.message);
                onClose();
                getCupon();
                setisProcessing(false);
                setCode('');
            }
        } catch (error) {
            console.log(error.message);
            setError(error.message || "Error al canjear el cupon");
            setisProcessing(false);
        }
    }

    return (
        <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex="-1" style={{ backgroundColor: show ? 'rgba(0,0,0,0.5)' : 'none' }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title"><i className="bi bi-upc-scan"></i> Canjear Cupon</h5>
                        <button type="button" className="btn-close" onClick={() => {
                            setError(null);
                            setCode('');
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
                        <form onSubmit={handleReedemCoupon}>
                            <div className="row">
                                <div className="mb-3">
                                    <label htmlFor="code" className="form-label"><i className="bi bi-upc"></i> Código del cupon</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Ingrese el código del cupon"
                                        value={code}
                                        disabled={isProcessing}
                                        onChange={(e) => setCode(e.target.value)}
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
                                        "Canjear cupon"
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

export default ReedemCoupon