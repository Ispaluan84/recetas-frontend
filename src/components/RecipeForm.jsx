import React from "react";

export default function RecipeForm({ form, onChange, onSubmit, titleForm = "Formulario de Receta", error}) {
  return (
    <form onSubmit={onSubmit} className="recipe-form">
        <h2>{titleForm}</h2>
        {error && <p className="error">{error}</p>}

        <input
            name="title"
            value={form.title}
            onChange={onChange}
            className="form-input"
            placeholder="Título"
            required
        />

        <textarea
            name="ingredients"
            value={form.ingredients}
            onChange={onChange}
            className="form-input"
            placeholder="Ingredientes"
            required
        />

        <textarea
            name="instructions"
            value={form.instructions}
            onChange={onChange}
            className="form-input"
            placeholder="Instrucciones"
            required
        />  

        <button className="submit-button">
            Guardar    
        </button>  
    </form>
  )  
}




