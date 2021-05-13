export const initialState = {
    // user: null,
    user: { email: "manjodhsaran1@gmail.com", name: "MANJODH SARAN", photoURL: "https://lh5.googleusercontent.com/-CmEzxu_gUrQ/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmb0WqYmN4wzMAolq6VHBhyRSHmkg/photo.jpg", uid: "108211302089427240314", },
    otherUserId: null,
};

const reducer = (state, action) => {

    switch (action.type) {

        case "SET_USER":
            return {
                ...state,
                user: action.user
            }
            break;

        case "SET_OTHER_USER_ID":
            return {
                ...state,
                otherUserId: action.otherUserId
            }
            break;

        default:
            return state;
    }
}

export default reducer;