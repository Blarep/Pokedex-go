import requests
import json

def get_pokemon_details(url):
    id = url.split("/")[-2]
    sprite_url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+ id +".png"
    return id, sprite_url
    if response.status_code == 200:
        data = response.json()
        """
        region_url = data["species"]["url"]
        region_response = requests.get(region_url)
        if region_response.status_code == 200:
            region_data = region_response.json()
            region = region_data["generation"]["name"]
        else:
            region = "Unknown"
        """
        sprite_url = data["sprites"]["front_default"]
        #return region, sprite_url
        return sprite_url
    else:
        return "Unknown"

def get_all_pokemon():
    url = "https://pokeapi.co/api/v2/pokemon?limit=1500"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        return data["results"]
    else:
        print("Failed to fetch Pokémon data")
        return []


all_pokemon = get_all_pokemon()
pokedex = []
for pokemon in all_pokemon:
    name = pokemon["name"]
    details_url = pokemon["url"]
    id, sprite_url = get_pokemon_details(details_url)
    pokemon_info = {
        "id": int(id),
        "name": name,
        #"img": sprite_url,
        "captured": False,
        "shiny": False,
        "dark": False,
        "purified": False,
        "lucky": False
    }
    pokedex.append(pokemon_info)
    print(f"Name: {name}, Sprite URL: {sprite_url}")

with open("pokedex.json", "w") as outfile:
    json.dump(pokedex, outfile)

print("Pokedex saved to 'pokedex.json'")