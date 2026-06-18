// Simula lo que hace el frontend: fetch + transform + filter
const apiUrl = 'https://api.saberparatodos.space/v1/questions?grade=11&subject=ingles&country=co&exam=icfes';

async function main() {
  console.log('Fetching from API...');
  const res = await fetch(apiUrl);
  const data = await res.json();
  console.log('API returned ' + (data.questions?.length || 0) + ' questions');
  
  if (data.questions?.length > 0) {
    const q = data.questions[0];
    console.log('First question sample:');
    console.log('  id:', q.id);
    console.log('  subject:', q.subject);
    console.log('  grade:', q.grade || q.grado);
    
    // Simulate subjectsMatch
    const bundleId = q.bundle_id || q.id.replace(/-v\d+$/, '-bundle');
    const category = 'INGLÉS :: ' + bundleId;
    const selectedSubject = 'Inglés';
    
    function normalizeSubjectName(s) {
      return String(s).toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[-_]/g, ' ').trim();
    }
    
    const normalizedCategory = normalizeSubjectName(String(category).split(' :: ')[0]);
    const normalizedSelected = normalizeSubjectName(selectedSubject);
    
    console.log('  category:', category);
    console.log('  normalizedCategory:', normalizedCategory);
    console.log('  normalizedSelected:', normalizedSelected);
    console.log('  MATCH result:', normalizedCategory === normalizedSelected);
    
    // Also test: what happens if selectedSubject is "Inglés" with accent?
    const selectedSubjectAccented = 'Inglés';
    const normalizedAccented = normalizeSubjectName(selectedSubjectAccented);
    console.log('  normalizedAccented:', normalizedAccented);
    console.log('  MATCH (accented input):', normalizedCategory === normalizedAccented);
  }
  
  // Test the second question too
  console.log('\n--- Testing ALL questions from API ---');
  const res2 = await fetch(apiUrl + '&page=1');
  const data2 = await res2.json();
  const questions = data2.questions || [];
  
  const categoriaSet = new Set();
  for (const q of questions) {
    const bundleId = q.bundle_id || q.id.replace(/-v\d+$/, '-bundle');
    const category = 'INGLÉS :: ' + bundleId;
    const catSubject = normalizeSubjectName(String(category).split(' :: ')[0]);
    categoriaSet.add(catSubject);
  }
  
  console.log('Unique category subjects from API:');
  for (const cat of categoriaSet) {
    console.log('  [' + cat + ']');
  }
}

main().catch(console.error);
