import * as actionTypes from "../constant/slideConstants"


export const switchView = (index) => (dispatch, getState) => {
    console.log(index)
    if (index === 0) {
        dispatch({
            type: actionTypes.FIRST_VIEW,
            payload: 0
        })
    }
  

    if (index === 1) {
        dispatch({
            type: actionTypes.SECOND_VIEW,
            payload: 1
        })
    }

    if (index === 2) {
        dispatch({
            type: actionTypes.LAST_VIEW,
            payload: 2
        })
    }

    localStorage.setItem("index", JSON.stringify(getState().getIndex))
}
