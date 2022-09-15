package site.metacoding.red.web.dto.response.boards;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
public class CMRespDto<T> {	//공통응답 Dto 
	private Integer code;//1정상 -1 실패
	private String msg;//실패의 이유, 성공한 이유
	private T data;//응답할 데이터/제네릭으로 해서 한번에 지정을 한다
}
