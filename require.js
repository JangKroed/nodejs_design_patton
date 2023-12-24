function loadModule(id, module, require) {
    return [id, module, require]
}

function require(moduleName) {
    console.log(`Require invoked for module: ${moduleName}`)
    const id = require.resolve(moduleName)  // 1
    if (require.cache[id]) {                // 2
        return require.cache[id].exports
    }

    // 모듈 메타데이터
    const module = {    // 3
        exports: {},
        id
    }
    // 캐시 업데이트
    require.cache[id] = module              // 4

    // 모듈 로드
    loadModule(id, module, require)         // 5

    // 익스포트되는 변수 반환
    return module.exports                   // 6
}
require.cache = {}
require.resolve = () => {
    /* 모듈이름으로 id로 불리게 되는 모듈의 전체경로를 찾아냄(resolve) */
}

/**
 * 1. 모듈 이름을 입력으로 받아 수행하는 첫 번째 일은 id라고 부르는 모듈의 전체경로를 알아내는(resolve) 것, 이를 해결하기 위해 관련 알고리즘을 구현하고 있는 require.resolve()에 위임
 * 2. 모듈이 이미 로드된 경우 캐시된 모듈을 사용, 즉시 반환
 * 3. 모듈이 아직 로드되지 않은 경우 최초 로드를 위해 환경을 설정, 특히 빈 객체 리터럴을 통해 초기화된 exports 속성을 가지는 module 객체를 만들고 불러올 모듈의 코드에서의 public API를 익스포트
 * 4. 최초 로드 후 module 객체가 캐시
 * 5. 모듈 소스 코드는 해당 파일에서 읽어오며, 코드는 앞에서 살펴본 방식으로 평가되며 방금 생성한 module 객체와 require() 함수의 참조를 모듈에 전달, 모듈은 module.exports 객체를 조작하거나 대체하여 public API를 내보낸다.
 * 6. 마지막으로 모듈의 public API를 나타내는 module.exports의 내용이 호출자에게 반환된다.
 */