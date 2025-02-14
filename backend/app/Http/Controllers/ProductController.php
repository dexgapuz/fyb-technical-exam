<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class ProductController extends Controller
{
    public function index(): JsonResponse
    {
        $products = Product::paginate(10);

        return response()->json($products);
    }

    public function store(CreateProductRequest $request): JsonResponse
    {
        $product = Product::create($request->validated());

        return response()->json($product);
    }

    public function show(Product $product): JsonResponse
    {
        return response()->json($product);
    }

    public function update(UpdateProductRequest $request, Product $product)
    {
        extract($request->validated());
        $product->name = $name;
        $product->description = $description;

        $product->save();

        return response()->json($product);
    }

    public function destroy(Product $product): JsonResponse
    {
        $product->delete();

        return response()->json();
    }
}
