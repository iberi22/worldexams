import re

with open(r'E:\scripts-python\worldexams\saberparatodos\src\layouts\Layout.astro', 'r', encoding='utf-8') as f:
    content = f.read()

# Add CountryBanner import after VersionBadge import
old = "import VersionBadge from '../components/VersionBadge.svelte';"
new = "import VersionBadge from '../components/VersionBadge.svelte';\nimport CountryBanner from '../components/CountryBanner.astro';"
content = content.replace(old, new)

# Add showCountryBanner to Props interface
old = "  showFooter?: boolean;\n}"
new = "  showFooter?: boolean;\n  showCountryBanner?: boolean;\n}"
content = content.replace(old, new)

# Update the destructuring
old = "  showFooter = true\n} = Astro.props;"
new = "  showFooter = true,\n  showCountryBanner = true\n} = Astro.props;"
content = content.replace(old, new)

# Add CountryBanner after showNavbar
old = "{showNavbar && <Navbar />}"
new = "{showNavbar && <Navbar />}\n\n    {showCountryBanner && <CountryBanner currentCountry={Astro.locals.countryCode} />}"
content = content.replace(old, new)

with open(r'E:\scripts-python\worldexams\saberparatodos\src\layouts\Layout.astro', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done - Layout.astro updated")
