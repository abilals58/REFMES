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

class IsStatisticCorrect(unittest.TestCase):
    def setUp(self):
        PATH_KUZU="C:\Program Files(x86)\chromedriver.exe"
        ser=Service(PATH_KUZU)
        self.driver=webdriver.Chrome(service=ser)

    def test_search_in_python_org(self):
        driver = self.driver
        driver.maximize_window()
        time.sleep(2)
        driver.get(WEB_LINK)
        time.sleep(2)
        element=driver.find_element(By.LINK_TEXT,"Login")
        element.click()
        time.sleep(2)
        username=driver.find_element(By.XPATH,"//input[@placeholder='Username']")
        username.send_keys("quzu3524")
        username.send_keys(Keys.RETURN)
        Password=driver.find_element(By.XPATH,"//input[@name='password']")
        Password.send_keys("Enis123!")
        Password.send_keys(Keys.RETURN)
        time.sleep(3)
        Referee=driver.find_element(By.LINK_TEXT, "Referees")
        Referee.click()
        time.sleep(3)
        RefDiv=driver.find_elements(By.XPATH,"//div[@class='ref-box-outer-container bg-color rounded shadow-sm px-4 py-5 m-1 ref-box-feature']")
        self.assertEqual(len(RefDiv),23)
        for eachref in RefDiv:
            Scores=eachref.find_element(By.XPATH,"//div[@class='ref-box-inner-container']")
            Paragraph=Scores.find_elements(By.XPATH,"//p[@class='ref-box-items-size']")

            self.assertEqual("Total Match",Paragraph[0].text,"total match error")
            self.assertEqual("Total Yellow Card",Paragraph[2].text,"yellow card error")
            self.assertEqual("Avg Yellow Card",Paragraph[4].text,"avg yellow card error")


    def tearDown(self):
        self.driver.close()

class SortedReferee(unittest.TestCase):
    def setUp(self):
        PATH_KUZU="C:\Program Files(x86)\chromedriver.exe"
        ser=Service(PATH_KUZU)
        self.driver=webdriver.Chrome(service=ser)

    def test_search_in_python_org(self):
        driver = self.driver
        driver.maximize_window()
        time.sleep(2)
        driver.get(WEB_LINK)
        time.sleep(2)
        element=driver.find_element(By.LINK_TEXT,"Login")
        element.click()
        time.sleep(2)
        username=driver.find_element(By.XPATH,"//input[@placeholder='Username']")
        username.send_keys("quzu3524")
        username.send_keys(Keys.RETURN)
        Password=driver.find_element(By.XPATH,"//input[@name='password']")
        Password.send_keys("Enis123!")
        Password.send_keys(Keys.RETURN)
        time.sleep(3)
        Referee=driver.find_element(By.LINK_TEXT, "Referees")
        Referee.click()
        time.sleep(3)
        RefDiv=driver.find_elements(By.XPATH,"//a[@class='ref-click-all w-100 m-1']")
        previous= RefDiv[0].find_element(By.CLASS_NAME,"refcard-ref-name").text
        for eachRef in RefDiv:
            Reflink=eachRef.find_element(By.CLASS_NAME,"refcard-ref-name")
            self.assertGreaterEqual(Reflink.text,previous)
            previous=Reflink.text
            print(Reflink.text)
        time.sleep(3)
    def tearDown(self):
        self.driver.close()
if __name__ == "__main__":
    unittest.main()