*** Settings ***
Documentation     Single place that opens the browser, so local runs and CI runs behave correctly.
...               On CI (the CI environment variable is set, as GitHub Actions does) Chrome runs
...               headless without the sandbox, which Selenium needs on shared Linux runners.
Library           SeleniumLibrary

*** Variables ***
${CI_CHROME_OPTIONS}    add_argument("--headless=new");add_argument("--no-sandbox");add_argument("--disable-dev-shm-usage");add_argument("--window-size=1920,1080")

${CHROME_NO_PASSWORD_PROMPT}    add_argument("--disable-notifications");add_experimental_option("prefs", {"credentials_enable_service": False, "profile.password_manager_enabled": False, "profile.password_manager_leak_detection": False})

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
    # Chrome's "change your password" bubble is browser UI, so Selenium cannot see or dismiss it and it
    # can swallow clicks. Turn it off at launch unless the caller already supplied its own prefs.
    IF    ${is_chrome} and 'add_experimental_option("prefs"' not in $options
        ${options}=    Set Variable If    $options == ""    ${CHROME_NO_PASSWORD_PROMPT}    ${options};${CHROME_NO_PASSWORD_PROMPT}
    END
    IF    $options == ""
        Open Browser    ${url}    ${browser}
    ELSE
        Open Browser    ${url}    ${browser}    options=${options}
    END
