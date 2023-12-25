const SUPPORTED_LANGUAGES = ['el', 'en', 'es', 'it', 'pl']  // 1
const selectedLanguage = process.argv[2]                     // 2

if (!SUPPORTED_LANGUAGES.includes(selectedLanguage)) {              // 3
    console.error('The specified language is not supported')
    process.exit(1)
}

const translationModule = `./strings-${selectedLanguage}.js` // 4
import(translationModule)                                           // 5
    .then((strings) => {                                      // 6
        console.log(strings.HELLO)
    })

/**
 * 1. 지원되는 언어의 리스트를 정의
 * 2. 선택한 언어를 커맨드라인의 첫 번째 인자를 받는다.
 * 3. 지원되지 않는 언어가 선택된 경우를 처리
 * 4. 선택된 언어를 사용하여 임포트하고자 하는 모듈의 이름을 동적으로 생성 및 도물의 이름에 상대경로를 사용하기  위해 ./ 를 파일이름 앞에 추가
 * 5. 모듈의 동적 임포트를 하기 위해서  import() 연산자를 사용
 * 6. 동적 임포트는 비동기적으로 되고 모듈이 사용될 준비가 되었을 떄를 알기 위해서 .then()을 반환된 프로미스에 사용, 모듈이 완전히 적재되었을 때, then()으로 전달된 함수가 실행되고 strings는 동적 임포트된 모듈의 네임스페이스가 되어 strings.HELLO에 접근할 수 있으며 콘솔에 값이 출력된다.
 */