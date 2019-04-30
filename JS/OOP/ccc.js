function celebrityName(firstName) {
    var nameIntro = "This is celebrity is ";
    // 이 내부 함수는 외부함수의 변수와 파라미터에 접근할 수 있습니다.
    function lastName(theLastName) {
        return nameIntro + firstName + " " + theLastName;
    }
    return lastName;
}
var mjName = celebrityName("Michael"); // 여기서 celebrityName 외부함수가 리턴됩니다.
// 외부함수가 위에서 리턴된 후에, 클로저(lastName)가 호출됩니다.
// 아직, 클로저는 외부함수의 변수와 파라미터에 접근 가능합니다.
mjName("Jackson"); // This celebrity is Michael Jackson
