import React, { useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";

const APP_ID = "a52b4d43";
const APP_KEY = "e0e5c667605f5e91d8275c973531b80a";

const RecipeContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 300px;
  box-shadow: 0 3px 10px 0 #aaa;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 200px;
`;
const RecipeName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin: 10px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const SeeMoreText = styled.span`
  color: #eb3300;
  font-size: 18px;
  text-align: center;
  border: solid 1px #eb3300;
  border-radius: 3px;
  padding: 10px 15px;
  cursor: pointer;
`;
const IngredientsText = styled(SeeMoreText)`
  color: green;
  border: solid 1px green;
  margin-bottom: 12px;
`;
const SeeNewTab = styled(SeeMoreText)`
  color: green;
  border: solid 1px green;
`;

const RecipeListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 20px;
  justify-content: space-evenly;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const RecipeComponent = (props) => {
    const [show, setShow] = useState("");

    const { label, image, ingredients, url } = props.recipe;
    return (
        <div>
            <Container>
                <RecipeContainer>
                    <Dialog
                        onClose={() => console.log("adsadad")}
                        aria-labelledby="simple-dialog-title"
                        open={!!show}
                    >
                        <DialogTitle>Ingredients</DialogTitle>
                        <DialogContent>
                            <RecipeName>{label}</RecipeName>
                            <table>
                                <thead>
                                    <th>Ingredient</th>
                                    <th>Weight</th>
                                </thead>
                                <tbody>
                                    {ingredients.map((ingredient, index) => (
                                        <tr key={index} className="ingredient-list">
                                            <td>{ingredient.text}</td>
                                            <td>{ingredient.weight}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </DialogContent>
                        <DialogActions>
                            <SeeNewTab onClick={() => window.open(url)}>See More</SeeNewTab>
                            <SeeMoreText onClick={() => setShow("")}>Close</SeeMoreText>
                        </DialogActions>
                    </Dialog>
                    <CoverImage src={image} alt={label} />
                    <RecipeName>{label}</RecipeName>
                    <IngredientsText onClick={() => setShow(!show)}>
                        Ingredients
                    </IngredientsText>
                    <SeeMoreText onClick={() => window.open(url)}>
                        See Complete Recipe
                    </SeeMoreText>
                </RecipeContainer>
            </Container>
        </div>
    );
};

function ChatBox() {


    const [searchQuery, updateSearchQuery] = useState("");
    const [recipeList, updateRecipeList] = useState([]);
    const [timeoutId, updateTimeoutId] = useState();
    const fetchData = async (searchString) => {
        const response = await Axios.get(
            `https://api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}`,
        );
        updateRecipeList(response.data.hits);
    };

    const onTextChange = (e) => {
        clearTimeout(timeoutId);
        updateSearchQuery(e.target.value);
        const timeout = setTimeout(() => fetchData(e.target.value), 500);
        updateTimeoutId(timeout);
    };

    return (
        <div>

            <div className="p-4 border-t border-gray-200">
                <div className="flex">
                    <input
                        type="text"
                        className="flex-grow px-4 py-2 mr-2 border border-gray-300 rounded"
                        placeholder="Search Recipe..."
                        value={searchQuery}
                        onChange={onTextChange}
                    />
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={onTextChange}
                    >
                        Search
                    </button>
                </div>
            </div>
            <RecipeListContainer>
                {recipeList?.length ? (
                    recipeList.map((recipe, index) => (
                        <RecipeComponent key={index} recipe={recipe.recipe} />
                    ))
                ) : searchQuery.length ? ( 
                    <div className="text-center">No Recipe Found</div>
                ) : (
                    <div></div>
                )
            }

            </RecipeListContainer>
        </div>
    );
}

export { ChatBox, RecipeComponent };
