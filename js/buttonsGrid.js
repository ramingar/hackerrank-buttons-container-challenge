const stateFactory = values => {

    const setElementsInnerHTML = (values, element) => element
        .map((button, index) => {
            button.innerHTML = values[index];
            return button
        });

    const moveValues = (values, pattern) => values
        .reduce((acc, val, index) => {
            acc[pattern[index]] = val;
            return acc;
        }, []);

    const render = (parent, elements) => {
        elements.map(val => {
            parent.appendChild(val)
        });
    };

    return {values, setElementsInnerHTML, moveValues, render};
};

const initialValues                 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const patternIndexRotationClockwise = [1, 2, 5, 0, 4, 8, 3, 6, 7];
const state                         = stateFactory(initialValues);

const btns = document.createElement('div');
btns.id    = 'btns';
document.body.appendChild(btns);

const buttons = state.values.map(val => {
    const btn = document.createElement('button');
    btn.id    = `btn${val}`;
    return btn;
});

const buttonsWithInnerHTML = state.setElementsInnerHTML(state.values, buttons);
state.render(btns, buttonsWithInnerHTML);

document.querySelector('#btn5').onclick = () => {
    const newValues             = state.moveValues(state.values, patternIndexRotationClockwise);
    const buttonsWithInnerHTML2 = state.setElementsInnerHTML(newValues, buttonsWithInnerHTML);
    state.values                = newValues;
    state.render(btns, buttonsWithInnerHTML2);
};