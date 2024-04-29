class Pokemon:
    def __init__(self, name, region, captured=False):
        self.name = name
        self.region = region
        self.captured = captured

# Function to display Pokémon by region
def display_pokemon_by_region(region):
    for pokemon in pokemons:
        if pokemon.region == region:
            print(pokemon.name)

# Function to filter Pokémon by captured status
def filter_pokemon(captured):
    for pokemon in pokemons:
        if pokemon.captured == captured:
            print(pokemon.name)

# Function to mark a Pokémon as captured
def mark_as_captured(pokemon_name):
    for pokemon in pokemons:
        if pokemon.name == pokemon_name:
            pokemon.captured = True

# Main program
pokemons = [
    Pokemon("Bulbasaur", "Kanto"),
    Pokemon("Charmander", "Kanto"),
    # Add more Pokémon here...
]

# Example usage
display_pokemon_by_region("Kanto")
filter_pokemon(captured=False)
mark_as_captured("Bulbasaur")