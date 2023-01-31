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

class numberOfClubs(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()

    def test_search_in_python_org(self):
        driver = self.driver
        driver.maximize_window()
        time.sleep(2)
        driver.get(WEB_LINK)
        time.sleep(2)
        standingClubs=driver.find_elements(By.XPATH,"//div[@class='home-top-standings-inner-item-club']")
        self.assertEqual(6, len(standingClubs))
        time.sleep(4)

    def tearDown(self):
        self.driver.close()

class directedToStandingsPage(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()

    def test_search_in_python_org(self):
        driver = self.driver
        driver.maximize_window()
        time.sleep(2)
        driver.get(WEB_LINK)
        time.sleep(2)
        AllClubStandings=driver.find_element(By.LINK_TEXT, "See All Club Standings")
        AllClubStandings.send_keys(Keys.RETURN)
        time.sleep(3)
        actualUrl = 'https://www.refmes.org/standings'
        expectedUrl = driver.current_url
        self.assertTrue(expectedUrl.startswith(actualUrl))
        time.sleep(4)

    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()