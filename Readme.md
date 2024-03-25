# create virtual envs

## Install dependancies
apt install python3.11-venv
apt install python3-dev

## Create a virtual environment named 'env'
python3 -m venv env

## Activate the virtual environment
source env/bin/activate

## Install poetry
pip3 install poetry
poetry add requests

## run the server
uvicorn main:app --reload

# Git commands 
git rm -r --cached . 
git add .
git commit -m "Remove node_modules folder"
git push 
