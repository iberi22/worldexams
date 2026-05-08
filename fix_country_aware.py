import re

# Fix pages to be country-aware
files_to_fix = [
    r'E:\scripts-python\worldexams\saberparatodos\src\pages\index.astro',
]

for filepath in files_to_fix:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # Fix "Colombia" references to use country-aware text
    # In the hero section, replace hardcoded "Colombia" with context-aware text
    content = content.replace(
        'La plataforma gratuita y de código abierto para estudiantes de Colombia.',
        'La plataforma gratuita y de código abierto para estudiantes de América Latina.'
    )
    content = content.replace(
        'practicar icfes, app icfes',
        'practicar examenes, simulacros gratis'
    )
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Fixed: {filepath}")

# Now let's also check the middleware.ts for ip-api.com (not ipapi.co which was failing)
middleware_path = r'E:\scripts-python\worldexams\saberparatodos\src\middleware.ts'
with open(middleware_path, 'r', encoding='utf-8') as f:
    middleware = f.read()

# ipapi.co is being used but it was returning 403
# Let's update to use ip-api.com instead
if 'ipapi.co' in middleware:
    middleware = middleware.replace('ipapi.co', 'ip-api.com')
    with open(middleware_path, 'w', encoding='utf-8') as f:
        f.write(middleware)
    print(f"Fixed middleware: ipapi.co -> ip-api.com")

print("Done")
