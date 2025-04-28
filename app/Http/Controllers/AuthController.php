<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;
use Illuminate\Support\Facades\Crypt;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required',
                'email' => 'required|email|unique:usuario',
                'password' => 'required|confirmed',
                'role' => 'required|in:cliente,empleado'
            ], [
                'name.required' => 'El nombre es obligatorio',
                'email.required' => 'El correo es obligatorio',
                'email.email' => 'Formato de correo eléctronico no es válido',
                'email.unique' => 'Este correo ya esta registrado',
                'password.required' => 'La contraseña es obligatoria',
                'password.confirmed' => 'Las contraseñas no coinciden',
                'role.required' => 'El rol es obligatorio',
                'role.in' => 'Solo se aceptan cliente y empleado'
            ]);

            $passwordEncryp = Crypt::encryptString($request->password);

            Usuario::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => $passwordEncryp,
                'role' => $request->role
            ]);

            return response()->json([
                'message' => 'Registro exitoso'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al registrarse: ' . $e->getMessage()
            ], 500);
        }
    }

    public function login(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
                'password' => 'required'
            ], [
                'email.required' => 'El correo es obligatorio',
                'email.email' => 'Formato de correo eléctroncio no es válido',
                'password.required' => 'La contraseña es obligatoria'
            ]);

            $user = Usuario::where('email', $request->email)->first();
            if (!$user) {
                return response()->json([
                    'message' => 'Usuario no registrado'
                ], 400);
            }

            $passwordDescrypt = Crypt::decryptString($user->password);

            if ($passwordDescrypt !== $request->password) {
                return response()->json([
                    'message' => 'Credenciales invalidas'
                ], 400);
            }

            $token = $user->createToken("auth_token")->plainTextToken;

            return response()->json([
                'message' => "Inicio de sesión exitoso",
                'token_access' => $token,
                'usuario' => $user
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al loguearse: ' . $e->getMessage()
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        try {

            $request->user()->currentAccessToken()->delete();

            return response()->json([
                'message' => 'Sesión cerrada exitosamente'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al desloguearse: ' . $e->getMessage()
            ], 500);
        }
    }
}
