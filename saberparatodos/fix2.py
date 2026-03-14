with open('src/components/App.svelte', 'r', encoding='utf-8') as f:
    text = f.read()

# Fix: currentView doesnt exist, real var is `view`
text = text.replace(
    '{#if currentView !== AppView.EXAM && currentView !== AppView.REVIEW}',
    '{#if view !== AppView.EXAM && view !== AppView.REVIEW}'
)

with open('src/components/App.svelte', 'w', encoding='utf-8') as f:
    f.write(text)
print("Fixed: replaced currentView with view in App.svelte header")
