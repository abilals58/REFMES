import selenium
import unittest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

WEB_LINK="https://www.refmes.org/admin"
LOCAL_LINK="http://localhost:3000/admin"

class numberOfClubs(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()

    def test_search_in_python_org(self):
        driver = self.driver
        driver.maximize_window()
        driver.get(WEB_LINK)
        time.sleep(2)
        element=driver.find_element(By.LINK_TEXT, "Update Pre-Week")
        element.click()
        time.sleep(2)
        element = driver.find_element(By.NAME, "admin-form-next-button")
        isNextButtonDisabled = element.get_property('disabled')
        self.assertTrue(isNextButtonDisabled)
        time.sleep(4)

    def tearDown(self):
        self.driver.close()

class postWeekConsistentTextError(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()

    def test_search_in_python_org(self):
        driver = self.driver
        driver.maximize_window()
        driver.get(WEB_LINK)
        time.sleep(2)
        element=driver.find_element(By.LINK_TEXT, "Update Post-Week")
        element.click()
        time.sleep(2)
        element = driver.find_element(By.XPATH,"//p[@class='post-consistent-text-error']")
        self.assertTrue(element.is_displayed())
        time.sleep(4)

    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()