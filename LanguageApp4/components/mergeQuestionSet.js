

function mergeQuestions(questions , translatedQuestionSet){
   
    const mergedData = {};
    for (const category in questions) {
        mergedData[category] = [];
        for (let i = 0; i < questions[category].length; i++) {
            mergedData[category].push([
                questions[category][i],
                translatedQuestionSet[category][i]
            ]);
        }
    }

    return mergedData;

}

export default mergeQuestions;