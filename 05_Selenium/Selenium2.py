from selenium import webdriver

options = webdriver.ChromeOptions()
driver = webdriver.Chrome(options=options)

driver.get("https://www.google.com")
print("Title:", driver.title)

driver.quit()

