from requests import get
from bs4 import BeautifulSoup
import json

objList = []
'''get the urls for a-z on /recipes-a-z'''
def getBaseUrls():
    '''function returns a list of all the base links from the root site containing all the recipes'''
    parentUrl = "https://www.foodnetwork.com/recipes/recipes-a-z"
    response = get(parentUrl)
    html_soup = BeautifulSoup(response.text, "html.parser")

    #get the links which host recipes from 123 - z
    rootLinks = html_soup.find_all('a', class_ = "o-IndexPagination__a-Button", href=True)
    rootLinksWithUrl = [None] * len(rootLinks)
    i = 0
    for a in rootLinks:
        rootLinksWithUrl[i] = "http://" + str(a['href'])[2:]
        i += 1

    return rootLinksWithUrl

'''for each recipe url provided add a json object containing the recipe information to objList'''
def getDataForUrl(newUrl):
    '''eventually for each link extracted from the base urls we are going to want to get this basic data '''

    response = get(newUrl)
    html_soup = BeautifulSoup(response.text, "html.parser")

    #beautiful soup items
    recipe_pic = html_soup.find('img', class_ = 'm-MediaBlock__a-Image a-Image', src=True)
    recipe_name = html_soup.find('span', class_ = 'o-AssetTitle__a-HeadlineText')
    ingredients = html_soup.find_all('p', class_ = 'o-Ingredients__a-Ingredient')
    directions = html_soup.find_all('li', class_ = 'o-Method__m-Step')
    recipeLevel = html_soup.find_all('ul', class_ = 'o-RecipeInfo__m-Level')
    recipeTime = html_soup.find_all('ul', class_ = 'o-RecipeInfo__m-Time')
    recipeYield = html_soup.find_all('ul', class_ = 'o-RecipeInfo__m-Yield')

    #converting beautiful soup items to basic objects and variables
    recipeName = ""
    if recipe_name.string is not None:
        recipeName = str(recipe_name.string)
    recipePicSrc = ""
    if recipe_pic is not None:
        strng = str(recipe_pic['src'])
        recipePicSrc = 'http://' + strng[2:]

    level = ""
    totDuration = ""
    levelSpan = []
    if len(recipeLevel) != 0:
        levelSpan = recipeLevel[0].find_all('span')
    if len(levelSpan) == 4:
        level = str(levelSpan[0].string) + " " + str(levelSpan[1].string)
        totDuration = str(levelSpan[2].string) + " " + str(levelSpan[3].string)

    prep = ""
    cook = ""
    prepSpan = []
    if len(recipeTime) != 0:
        prepSpan = recipeTime[0].find_all('span')
    if len(prepSpan) == 4:
        prep = str(prepSpan[0].string) + " " + str(prepSpan[1].string)
        cook = str(prepSpan[2].string) + " " + str(prepSpan[3].string)

    yieldStr = ""
    yieldSpan = []
    if len(recipeYield) != 0:
        yieldSpan = recipeYield[0].find_all('span')
    if len(yieldSpan) == 4:
        yieldStr = str(yieldSpan[1].string) + " " + str(yieldSpan[2].string)

    ingredientList = [None] * len(ingredients)
    i = 0
    for a in ingredients:
        ingredientList[i] = str(a.string)
        i += 1

    directionList = [None] * len(directions)
    i = 0
    for b in directions:
        directionList[i] = str(b.string).strip()
        i += 1

    '''
    recipeName - recipe name
    recipePicSrc - src for hotloading recipe image
    level - difficulty level of recipe
    totDuration - total duration to cook recipe
    prep - prep time for recipe
    cook - cook time for recipe
    yieldStr - the amount the recipe yields
    ingredientList - the list of ingredients
    directionList - the list of directions 
    '''

    data = {}
    data["name"] = recipeName
    data["img"] = recipePicSrc
    data["level"] = level
    data["total"] = totDuration
    data["prep"] = prep
    data["cook"] = cook
    data["yield"] = yieldStr
    data["ingredients"] = ingredientList
    data["directions"] = directionList

    objList.append(data)

'''go through the urls provided from /recipes-a-z and get 25 links from each page and return all these urls as a link'''
def getUrlsFromBase():
    rootLinks = getBaseUrls()
    totLinks = []
    for link in rootLinks:
        baseUrl = link
        response = get(baseUrl)
        html_soup = BeautifulSoup(response.text, "html.parser")
        links = html_soup.find_all('li', class_ = "m-PromoList__a-ListItem", limit=25)
        for a in links:
            urlList = a.find_all('a', href=True)
            for urls in urlList:
                totLinks.append('http://' + str(urls['href'])[2:])

    return totLinks

''' get the list of total urls, call get data for them and then write to a file called data.json'''
def scrapeAll():
    totalLinks = getUrlsFromBase()
    print('Total length is: ' + str(len(totalLinks)))
    num = 1
    for i in totalLinks:
        getDataForUrl(i)
        progress = str((num / len(totalLinks)) * 100)
        print('Progress is: ' + progress)
        num += 1
    with open('data.json', 'w') as outfile:
        outfile.write(json.dumps(objList))
    print("done")

scrapeAll()
