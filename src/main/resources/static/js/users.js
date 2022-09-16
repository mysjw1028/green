let isUsernameSameCheck = false;


// join을 누르면 join이라는 함수가 실행이 된다.
$("#btnJoin").click(() => {
	join();
});

$("#btnUsernameSameCheck").click(() => {
	checkUsername();
});

$("#btnLogin").click(() => {
	login();
	//loginTest();
});

$("#btnDelete").click(() => {
	resing();
});


$("#btnUpdate").click(() => {
	update();
});



function join() {
	if (isUsernameSameCheck == false) {
		alert("유저네임 중복 체크를 진행해주세요");
		return;
	}

	// 0. 통신 오브젝트 생성
	let data = {
		username: $("#username").val(),
		password: $("#password").val(),
		email: $("#email").val()
	};

	$.ajax("/join", {
		type: "POST",
		dataType: "json",
		data: JSON.stringify(data),// http의 보낼 데이터?

		headers: {//http헤더에 들고갈 데이터
			"Content-Type": "application/json"
		}//http에 적혀있는 키값이라서 정확히 적어야함
	}).done((res) => {
		if (res.code == 1) {
			// console.log(res);
			location.href = "/loginForm";
			//location.href = "/";
		}
	});
}

function checkUsername() {
	// 0. 통신 오브젝트 생성 (Get 요청은 body가 없다.)

	// 1. 사용자가 적은 username 값을 가져오기
	let username = $("#username").val();

	// 2. Ajax 통신
	$.ajax(`/users/usernameSameCheck?username= ${username}`, {
		type: "GET",
		dataType: "json",
		async: true
	}).done((res) => {
		console.log(res);
		if (res.code == 1) { // 통신 성공
			if (res.data == false) {
				alert("아이디가 중복되지 않았습니다.");
				isUsernameSameCheck = true;
			} else {
				alert("아이디가 중복되었어요. 다른 아이디를 사용해주세요.");
				isUsernameSameCheck = false;
				$("#username").val("");
			}
		}
	});
}

function loginTest() {
	let remember = $("#remember").prop("checked");
	console.log(remember);
}



function login() {
	//alert("로그인함수 실행됨");
	let data = {
		username: $("#username").val(),
		password: $("#password").val(),
		remember: $("#remember").prop("checked")
	};

	$.ajax("/login", {
		type: "POST",
		dataType: "json",//응답 데이터
		data: JSON.stringify(data),// http body에 들고갈 요청 데이터	 
		headers: {//http헤더에 들고갈 데이터
			"Content-Type": "application/json; charset=utf-8"//안넣으면 한글 들어갈때 다 깨짐 ;으로 사용
		}
	}).done((res) => {
		if (res.code == 1) {
			location.href = "/";
		} else {
			alert("로그인실패, 아이디 패스워드를 확인해주세요");
		}
	});
}
function resing() {
	let id = $("#id").val();
	//이엘표현식을 자바스크립트안에서 사용하면 안됨 
	$.ajax("/users/" + id, {
		type: "DELETE",
		dataType: "json"//응답 데이터
	}).done((res) => {
		if (res.code == 1) {
			// console.log(res);
			alert("회원 탈퇴 완료");
			location.href = "/";
		} else {
			alert("회원탈퇴 실패");
		}
	});
}

function update() {

	let data = {
		password: $("#password").val(),
		email: $("#email").val()
	};

	let id = $("#id").val();
	//이엘표현식을 자바스크립트안에서 사용하면 안됨 
	$.ajax("/users/" + id, {
		type: "PUT",
		dataType: "json",//응답 데이터
		data: JSON.stringify(data),// http body에 들고갈 요청 데이터	 
		headers: {//http헤더에 들고갈 데이터
			"Content-Type": "application/json; charset=utf-8"//안넣으면 한글 들어갈때 다 깨짐 ;으로 사용
		}
	}).done((res) => {
		if (res.code == 1) {
			// console.log(res);
			alert("회원 수정 완료");
			location.reload();//새로고침 F5
		} else {
			alert("업데이트에 실패하였습니다");
		}
	});
}
