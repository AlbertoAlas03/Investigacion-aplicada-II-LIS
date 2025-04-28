import useLogin from "../hooks/useLogin"
import usuario from "../assets/img/usuario-seguro.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useLogin();

    const togglePasswordVisibility = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        if (!email || !password) {
            setError("Por favor, ingrese la información requerida");
            setLoading(false);
            return;
        }

        const userData = {
            email: email,
            password: password
        }

        try {
            const response = await login(userData);
            if (response.message === "Inicio de sesión exitoso") {
                navigate('/', { replace: true });
            }
        } catch (error) {
            console.log("error al iniciar sesion: ", error.message);
            setError(error.message || "Error al iniciar sesion");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="card shadow-lg rounded-3 w-75" style={{ maxWidth: '500px' }}>
                <div className="card-body">
                    <h2 className="text-center mb-4" style={{ fontSize: '2rem' }}>Iniciar Sesión</h2>
                    <img src={usuario} alt="Usuario" className="img-fluid mx-auto d-block mb-4" style={{ width: '100px', height: '100px' }} />
                    {error && (
                        <div className="alert alert-danger d-flex align-items-center" role="alert">
                            <i className="bi bi-x-circle-fill me-2"></i>
                            {error}
                        </div>
                    )}
                    {loading && (
                        <div className="alert alert-info d-flex align-items-center" role="alert">
                            <i className="bi bi-hourglass-split me-2"></i>
                            Iniciando sesión...
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="form-label" style={{ fontSize: '1.1rem' }}>Correo electrónico</label>
                            <input type="email" className="form-control form-control-lg" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Ingrese su correo electrónico" style={{ fontSize: '1.1rem' }} disabled={loading}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="form-label" style={{ fontSize: '1.1rem' }}>Contraseña</label>
                            <div className="input-group">
                                <input type={showPassword ? 'text' : 'password'} className="form-control form-control-lg" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Ingrese su contraseña" style={{ fontSize: '1.1rem' }} disabled={loading}
                                />
                                <button className="input-group-text" onClick={togglePasswordVisibility}><i className={showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i></button>
                            </div>
                        </div>

                        <div className="text-center mb-4">
                            <button type="submit" className="btn btn-primary w-100 btn-lg">
                                {loading ? (
                                    <>
                                        <i className="bi bi-arrow-repeat me-2 spin"></i> Iniciado sesión...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-box-arrow-in-right me-2"></i>
                                        Iniciar Sesión
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                    <p className="text-center mt-4" style={{ fontSize: '1.1rem' }}>
                        ¿No tienes cuenta? <a type="button" onClick={() => navigate('/register')} className="text-decoration-none text-primary">Regístrate</a>
                    </p>
                </div>
            </div >
        </div >
    )
}

export default Login