import { runBatch } from './massive-generation-v5.2';

const starterTasks = [
    { subject: 'matematicas', grade: 8, week: 1, topic: 'expresiones-algebraicas' },
    { subject: 'ciencias-naturales', grade: 11, week: 1, topic: 'quimica-organica', options: { isPeriodo: true } },
    { subject: 'sociales-ciudadanas', grade: 9, week: 1, topic: 'primera-guerra-mundial' }
];

runBatch(starterTasks).catch(console.error);
