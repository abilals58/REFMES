import selenium
import unittest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

WEB_LINK="https://www.refmes.org/"
LOCAL_LINK="http://localhost:3000/"

class IsSendReport(unittest.TestCase):
    def setUp(self):
        PATH_ABILAL="C:\Program Files(x86)\chromedriver.exe"
        ser=Service(PATH_ABILAL)
        self.driver=webdriver.Chrome(service=ser)

    def test_send_report_in_refmes(self):
        driver = self.driver
        driver.maximize_window()
        time.sleep(2)
        driver.get(WEB_LINK)
        time.sleep(2)
        element=driver.find_element(By.LINK_TEXT,"Login")
        element.click()
        time.sleep(2)
        username=driver.find_element(By.XPATH,"//input[@placeholder='Username']")
        username.send_keys("abilal")
        username.send_keys(Keys.RETURN)
        Password=driver.find_element(By.XPATH,"//input[@name='password']")
        Password.send_keys("8765432Bb!")
        Password.send_keys(Keys.RETURN)
        time.sleep(3)
        Report = driver.find_element(By.XPATH,"//a[@id='report']")
        Report.click()
        time.sleep(3)
        #test to page header
        Header = driver.find_element(By.XPATH, "//div[@class='row report-page-header']")
        self.assertEqual("Report Page", Header.text, "page header error")
        #test to label on the form before send
        Form = driver.find_elements(By.XPATH, "//div[@class='form-group']")
        self.assertEqual("Please write your report and click send report.", Form[0].text, "label error before send")
        
        Report_message = driver.find_element(By.XPATH,"//input[@name='submitButton']")
        Report_message.send_keys(" This is a report message to test!")
        time.sleep(2)
        Report_message.send_keys(Keys.RETURN)
        time.sleep(3)

        #test to label on the form after send
        After_form = driver.find_elements(By.XPATH, "//div[@class='form-group']")
        self.assertEqual("Your report is submitted, please check your email for response.", After_form[0].text, "label error after send")

    def tearDown(self):
        self.driver.close()
if __name__ == "__main__":
    unittest.main()