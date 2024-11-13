const express = require('express');

const app = express();


const {initializeDatabase} = require('./db/db.connect')

//Q1
const Recipe = require('./models/recipe.models');

//add middleware
app.use(express.json())

//Q2
initializeDatabase();


app.get('/', (req,res) => {
    res.send('Welcome to Recipe App')
})


//Q3 to Q5

async function createRecipe(newRecipe) {
    try {
        const recipe = new Recipe(newRecipe);
        const saveRecipe = await recipe.save();
        return saveRecipe;
    } catch (error) {
        console.log(error);
        throw error;
    }
}



app.post('/recipes', async (req, res) => {
    try {
        const savedRecipe = await createRecipe(req.body);
        res.status(201).json({message: 'Recipe saved successfully.', recipe: savedRecipe});
    } catch (error) {
        res.status(500).json({error: 'Failed to add recipe.'})
    }
});



//Q6

async function readAllRecipes() {
    try {
        const allRecipes = await Recipe.find();
        return allRecipes;
    } catch (error) {
        throw error;
    }
}


app.get('/allRecipes', async (req, res) => {
    try {
        const allRecipes = await readAllRecipes();

        if(allRecipes){
            res.json(allRecipes)
        }else{
            res.status(404).json({error: 'No Recipes found.'})
        }
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch data.'})
    }
})


//Q7

async function readByTitle(titleName) {
    try {
        const title = await Recipe.find({title: titleName});
        return title;

    } catch (error) {
        throw error;
    }
}



app.get('/recipes/:title', async (req, res) => {
    try {
        const readTitle = await readByTitle(req.params.title);
        
        if(readTitle){
            res.json(readTitle)
        }else{
            res.status(404).json({error: 'Recipe not Found.'})
        }
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch data'});
    }
})


//Q8

async function readByAuthor(authorName) {
    try {
        const readRecipe = await Recipe.find({author: authorName});
        return readRecipe;
    } catch (error) {
        throw error;
    }
}


app.get('/recipes/author/:authorName', async (req, res) => {
    try {
        const readRecipe = await readByAuthor(req.params.authorName);
        if(readRecipe){
            res.json(readRecipe)
        }else{
            res.status(404).json({error: 'Recipe not found.'})
        }
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch data.'})
    }
})

//Q9

async function readByDifficulty(difficulty) {
    try {
    const getRecipe = await Recipe.find({difficulty: difficulty});
    return getRecipe

    } catch (error) {
        throw error;
    }
    
}

app.get('/recipes/difficulty/:difficultyMode', async (req, res) => {
    try {
        const readRecipe = await readByDifficulty(req.params.difficultyMode);

        if(readRecipe){
            res.json(readRecipe)
        }else{
            res.status(404).json({error: 'Recipe not found.'});
        }
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch data'})
    }
})



//Q10, 11

async function updateByDifficulty(titleToUpdate, dataToUpdate) {
    try {
        const updatedRecipe = await Recipe.findOneAndUpdate({title: titleToUpdate}, dataToUpdate,  {new: true});
        return updatedRecipe;

    } catch (error) {
        console.log(error)
        throw error;
        
    }
}


app.post('/recipes/difficultyUpdate/:difficulty', async(req, res) => {
    try {
        const updatedRecipe = await updateByDifficulty(req.params.difficulty, req.body);

        if(updatedRecipe){
            res.json(updatedRecipe)
        }else{
            res.status(404).json({error: 'Recipe not updated.'})
        }
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch data.'})
    }
})


//Q12

async function deleteRecipe(recipeId) {
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);

        return deletedRecipe;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

app.delete('/recipes/deleteRecipe/:recId', async(req, res) => {
    try {
        const deletedRecipe = await deleteRecipe(req.params.recId);

        if(deletedRecipe){
            res.status(200).json({message: 'Recipe deleted successfully.'})
        }else{
            res.status(404).json({error: 'Recipe not found'})
        }
    } catch (error) {
        res.status(500).json({error: 'Failed to delete recipe.'});        
    }
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})

// 67338e4412f62c422276bc76

// 67338e6412f62c422276bc78