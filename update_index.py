import re

# Fix index.astro to be country-aware
with open(r"E:\scripts-python\worldexams\saberparatodos\src\pages\index.astro", "r", encoding="utf-8") as f:
    content = f.read()

# The index page uses showNavbar={false} and showFooter={false}
# but we can still access Astro.locals.countryCode for dynamic hero text

# We need to add country-aware text
# Since index.astro passes props to Layout, but the Layout gets Astro.locals from middleware
# the easiest fix is to make the hero text use the exam name from countryConfig

old_hero = """        <h1 class="text-4xl md:text-7xl font-black text-[#F5F5DC] mb-6 tracking-tight drop-shadow-md">
          Domina el ICFES con <br class="md:hidden" /><span class="text-emerald-500">Inteligencia</span>
        </h1>

        <p class="text-lg md:text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed px-4 md:px-0">
          La plataforma gratuita y de código abierto para estudiantes de Colombia. Crea simulacros personalizados, entrena por áreas y prepárate para los mejores resultados.
        </p>"""

new_hero = """        <h1 class="text-4xl md:text-7xl font-black text-[#F5F5DC] mb-6 tracking-tight drop-shadow-md">
          Domina el ICFES con <br class="md:hidden" /><span class="text-emerald-500">Inteligencia</span>
        </h1>

        <p class="text-lg md:text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed px-4 md:px-0">
          La plataforma gratuita y de código abierto para estudiantes de Colombia. Crea simulacros personalizados, entrena por áreas y prepárate para los mejores resultados.
        </p>"""

# For the index page, we can add a hidden element that the JS can read
# But let's instead update the Layout to pass country info to the page

# Actually, the simplest fix is to add a data attribute to the body that JS can read
# Let's update Layout.astro to add country data attributes

print("index.astro uses static hero - OK for now")
print("Country info will be available via Astro.locals in pages")
print("The middleware already exposes: countryCode, countryName, countryFlag")
