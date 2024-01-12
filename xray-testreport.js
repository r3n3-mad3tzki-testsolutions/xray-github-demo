const fs = require('fs');

const projectKey = 'XD';
const testPlanKey = `${projectKey}-2`;
const testPlanTitle = "Regression 2"
const tests = [
    [1, true],
//    [2, true],
//    [3, true],
    [4, false]
];

const rawImage = fs.readFileSync('./evidence.png');
const evidence = Buffer.from(rawImage, 'binary').toString('base64');

const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const generateStartAndEndDate = () => {
    const startDate = new Date();
    const endDate = new Date();

    startDate.setMinutes(startDate.getMinutes() + randomIntFromInterval(1, 3));
    endDate.setMinutes(startDate.getMinutes());
    endDate.setSeconds(startDate.getSeconds() + randomIntFromInterval(1, 90));

    return [startDate.toISOString(), endDate.toISOString()];

}

const generateEvidence = (id) => ({
    data: evidence,
    filename: `evidence-${id}.png`,
    contentType: "image/png"
})

const generateTestStepResult = (key, isPassed) => {
    const [startDate, endDate] = generateStartAndEndDate();
    let result = {
        testKey: `${projectKey}-${key}`,
        start: startDate,
        finish: endDate,
        comment: isPassed ? "Successful execution" : "execution failed",
        status: isPassed ? "PASSED" : "FAILED",
        evidence: isPassed ? [] : [generateEvidence(key)]
    };

    return result;

}

const generateTestExecutionResult = () => ({
    info: {
        project: `${projectKey}`,
        testPlanKey: `${testPlanKey}`,
        summary: `Test execution for ${testPlanTitle} - ${new Date().toISOString()}`
    },
    tests: tests.map(([k, v]) => generateTestStepResult(k,v))
})

const execution = generateTestExecutionResult();

fs.writeFileSync('./xray-testreport.json', JSON.stringify(execution));