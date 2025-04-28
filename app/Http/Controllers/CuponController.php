<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cupon;

class CuponController extends Controller
{
    public function addCupon(Request $request)
    {
        try {
            $request->validate([
                'codigo' => 'required',
                'monto' => 'required|decimal:2|min:0.1'
            ], [
                'codigo.required' => 'El codigo es obligatorio',
                'monto.required' => 'El monto es obligatorio',
                'monto.decimal' => 'Formato de monto no válido',
                'monto.min' => 'El monto debe ser mayor a 0'
            ]);
            $checkCupon = Cupon::where('codigo', $request->codigo)->first();
            if ($checkCupon) {
                return response()->json([
                    'message' => 'Este cupon ya existe'
                ]);
            }
            Cupon::create([
                'codigo' => $request->codigo,
                'monto' => $request->monto
            ]);
            return response()->json([
                'message' => 'Cupon agregado exitosamente'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al agregar el cupon: ' . $e->getMessage()
            ], 500);
        }
    }

    public function deleteCupon(Request $request)
    {
        try {
            $request->validate([
                'codigo' => 'required'
            ]);
            $Verifycupon = Cupon::where('codigo', $request->codigo)->first();
            if (!$Verifycupon) {
                return response()->json([
                    'message' => 'Este cupon no existe'
                ], 400);
            }
            $Verifycupon->delete();
            return response()->json([
                'message' => 'Cupon eliminado exitosamente'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al eliminar el cupon: ' . $e->getMessage()
            ], 500);
        }
    }

    public function getCuponByCode(Request $request)
    {
        try {
            $request->validate([
                'codigo' => 'required'
            ], [
                'codigo.required' => 'El codigo es obligatorio'
            ]);
            $cupon = Cupon::where('codigo', $request->codigo)->first();
            if (!$cupon) {
                return response()->json([
                    'message' => 'Este cupon no existe'
                ], 400);
            }
            return response()->json([
                'success' => true,
                'data' => [$cupon]
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al obtener el cupon: ' . $e->getMessage()
            ], 500);
        }
    }

    public function getCupon()
    {
        try {
            $cupon = Cupon::get();
            return response()->json([
                'success' => true,
                'data' => $cupon
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al obtener los cupones: ' . $e->getMessage()], 500);
        }
    }

    public function CanjearCupon(Request $request)
    {
        try {
            $request->validate([
                'codigo' => 'required'
            ], [
                'codigo.required' => 'El codigo del cupon es obligatorio'
            ]);
            $Verifycupon = Cupon::where('codigo', $request->codigo)->first();
            if (!$Verifycupon) {
                return response()->json([
                    'message' => 'Este cupon no existe'
                ], 400);
            } else if ($Verifycupon->estado === 'canjeado') {
                return response()->json([
                    'message' => 'Este cupon ya fue canjeado'
                ], 400);
            } else if ($Verifycupon->estado === 'vencido') {
                return response()->json([
                    'message' => 'Este cupon esta vencido, no se puede canjear'
                ], 400);
            }
            $Verifycupon->update([
                'estado' => 'canjeado'
            ]);
            return response()->json([
                'message' => 'Cupon canjeado con exito'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al canjear el cupon: ' . $e->getMessage()
            ], 500);
        }
    }
}
