*** Settings ***
Documentation     Single place that opens the browser, so local runs and CI runs behave correctly.
...               On CI (the CI environment variable is set, as GitHub Actions does) Chrome runs
...               headless without the sandbox, which Selenium needs on shared Linux runners.
Library           SeleniumLibrary

*** Variables ***
${CI_CHROME_OPTIONS}    add_argument("--headless=new");add_argument("--no-sandbox");add_argument("--disable-dev-shm-usage");add_argument("--window-size=1920,1080")

*** Keywords ***
Open Browser For Test
    [Documentation]    Drop-in replacement for "Open Browser". Extra Chrome options can be passed in
    ...                \${options} (same "add_argument(...);..." syntax as SeleniumLibrary).
    [Arguments]        ${url}    ${browser}=chrome    ${options}=${EMPTY}
    ${on_ci}=          Evaluate    os.environ.get("CI", "").lower() in ("true", "1")    modules=os
    ${is_chrome}=      Evaluate    "${browser}".lower() in ("chrome", "googlechrome", "gc")
    IF    ${on_ci} and ${is_chrome}
        ${options}=    Set Variable If    $options == ""    ${CI_CHROME_OPTIONS}    ${options};${CI_CHROME_OPTIONS}
    END
    IF    $options == ""
        Open Browser    ${url}    ${browser}
    ELSE
        Open Browser    ${url}    ${browser}    options=${options}
    END
