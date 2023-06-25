const express = require('express')
const db = require('../db/db')
const router = express.Router()

//*recipe routes
router.get('/recipes', async (req, res) => {
  const recipes = await db.getRecipes()
  res.render('recipes', { recipes: recipes })
})

router.get('/recipes/:id', async (req, res) => {
  const idNum = req.params.id
  const recipe = await db.getRecipe(idNum)
  recipe.ingredients = await db.getIngredientsByRecipe(idNum)
  res.render('recipe', recipe)
})

//*ingredient routes
router.get('/ingredients', async (req, res) => {
  const ingredients = await db.getIngredients()
  res.render('ingredients', { ingredients: ingredients })
})

router.get('/ingredients/:id', async (req, res) => {
  const idNum = req.params.id
  const ingredient = await db.getIngredient(idNum)
  ingredient.recipe = await db.getRecipesByIngredient(idNum)
  res.render('ingredient')
})

//*shoppinglist route
router.get('/shoppinglist', async (req, res) => {
  res.render('shoppinglist')
})
module.exports = router
