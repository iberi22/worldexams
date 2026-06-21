function getBundleLogic(data) {
  const rawPeriod = String(data.periodo || "").toLowerCase();
  const weekField = data.week || data.semana || "";
  const isWeeklyBundle =
    rawPeriod === "weekly" ||
    data.bundle_type === "weekly" ||
    weekField !== "";

  let period = NaN;
  const weekMatch = String(weekField).match(/^W(\d{2})$/i);
  if (weekMatch) {
    period = Number(weekMatch[1]);
  } else if (weekField !== "" && !isNaN(parseInt(weekField))) {
    period = parseInt(weekField);
  } else {
    const parsed = parseInt(data.periodo);
    period = isNaN(parsed) ? 1 : parsed;
  }
  return { isWeeklyBundle, period };
}

const testCases = [
  {
    name: "Legacy Weekly",
    data: { periodo: "weekly" },
    expected: { isWeeklyBundle: true, period: 1 }
  },
  {
    name: "Legacy Weekly with numeric periodo",
    data: { periodo: "weekly", week: "W07" },
    expected: { isWeeklyBundle: true, period: 7 }
  },
  {
    name: "v5.2 Weekly with Wxx (week field)",
    data: { week: "W12" },
    expected: { isWeeklyBundle: true, period: 12 }
  },
  {
    name: "v5.2 Weekly with Wxx (semana field)",
    data: { semana: "W25" },
    expected: { isWeeklyBundle: true, period: 25 }
  },
  {
    name: "Numeric week (Dominican Republic style)",
    data: { semana: 7 },
    expected: { isWeeklyBundle: true, period: 7 }
  },
  {
    name: "Numeric week string",
    data: { week: "15" },
    expected: { isWeeklyBundle: true, period: 15 }
  },
  {
    name: "Bundle type weekly",
    data: { bundle_type: "weekly", periodo: 3 },
    expected: { isWeeklyBundle: true, period: 3 }
  },
  {
    name: "Not a weekly bundle (diagnostic or other)",
    data: { periodo: 1 },
    expected: { isWeeklyBundle: false, period: 1 }
  },
  {
    name: "Empty data",
    data: {},
    expected: { isWeeklyBundle: false, period: 1 }
  }
];

let failures = 0;
testCases.forEach(tc => {
  const result = getBundleLogic(tc.data);
  const passed = result.isWeeklyBundle === tc.expected.isWeeklyBundle && result.period === tc.expected.period;
  if (passed) {
    console.log(`PASS: ${tc.name}`);
  } else {
    console.log(`FAIL: ${tc.name}`);
    console.log(`  Expected: ${JSON.stringify(tc.expected)}`);
    console.log(`  Got:      ${JSON.stringify(result)}`);
    failures++;
  }
});

if (failures === 0) {
  console.log("\nAll tests passed!");
  process.exit(0);
} else {
  console.log(`\n${failures} tests failed.`);
  process.exit(1);
}
