<?php

namespace App\Http\Controllers;

use App\Models\Field;
use Inertia\Inertia;
use Illuminate\Http\Request;

class FieldController extends Controller
{
    public function index(Request $request): \Inertia\Response
    {
        $user = $request->user();

        $fields = $user->fields;

        return Inertia::render('Fields/Index', [
            'fields' => $fields
        ]);
    }

    public function store(Request $request): void
    {
        $user = $request->user();
        $fieldName = $request->get('value');

        if($fieldName){
            $field = new Field();
            $field->order = -1;
            $field->value = $fieldName;
            $field->user_id = $user->id;
            $field->save();
        }
    }

    public function update(Request $request): void
    {
        $fields = $request->get('fields');

        foreach($fields as $field){
            Field::where('id', $field['id'])->update(['order' => $field['order']]);
        }
    }

    public function delete(Request $request): void
    {
        $fieldID = $request->get('field_id');
        if($fieldID){
            Field::where('id', $fieldID)->delete();
        }
    }
}
