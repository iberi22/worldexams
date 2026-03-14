with open('src/components/App.svelte', 'r', encoding='utf-8') as f:
    text = f.read()

# Fix: AppView.REVIEW doesnt exist, real var is AppView.RESULTS
text = text.replace(
    '{#if view !== AppView.EXAM && view !== AppView.REVIEW}',
    '{#if view !== AppView.EXAM && view !== AppView.RESULTS}'
)

with open('src/components/App.svelte', 'w', encoding='utf-8') as f:
    f.write(text)
print("Final Fix: replaced AppView.REVIEW with AppView.RESULTS in App.svelte")
