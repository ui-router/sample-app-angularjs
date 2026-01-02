const { test, expect } = require('@playwright/test');

const EMAIL_ADDRESS = 'myself@angular.dev';

test.describe('unauthenticated sample app', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.sessionStorage.clear());
  });

  test('loads', async ({ page }) => {
    await page.goto('/');
  });

  test('renders home', async ({ page }) => {
    await page.goto('/#/home');
    await expect(page.getByRole('button', { name: 'Messages' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Contacts' })).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Preferences' })
    ).toBeVisible();
  });

  test('asks for authentication', async ({ page }) => {
    await page.goto('/#/home');
    await page.getByRole('button', { name: 'Preferences' }).click();

    await expect(page.getByRole('heading', { name: 'Log In' })).toBeVisible();
    await expect(page.locator('label[for="username"]')).toBeVisible();
    await expect(page.locator('label[for="password"]')).toBeVisible();

    const appConfig = await page.evaluate(() =>
      sessionStorage.getItem('appConfig')
    );
    expect(appConfig).toBeNull();
  });

  test('can authenticate', async ({ page }) => {
    await page.goto('/#/prefs');

    const appConfigBefore = await page.evaluate(() =>
      sessionStorage.getItem('appConfig')
    );
    expect(appConfigBefore).toBeNull();

    await expect(page.getByRole('heading', { name: 'Log In' })).toBeVisible();
    await expect(page.locator('label[for="username"]')).toBeVisible();
    await expect(page.locator('label[for="password"]')).toBeVisible();

    await page.locator('select#username').selectOption(EMAIL_ADDRESS);
    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(page.getByText('Reset All Data')).toBeVisible();

    const appConfig = await page.evaluate(() =>
      sessionStorage.getItem('appConfig')
    );
    expect(appConfig).not.toBeNull();
  });
});

test.describe('authenticated sample app', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/login');
    await page.evaluate(() => window.sessionStorage.clear());
    await page.locator('select#username').selectOption(EMAIL_ADDRESS);
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page).toHaveURL(/#\/(home|welcome)/);
  });

  test('navigates to Preferences by url', async ({ page }) => {
    await page.goto('/#/prefs');
    await expect(page.getByText('Reset All Data')).toBeVisible();
  });

  test('navigates to Contacts by url', async ({ page }) => {
    await page.goto('/#/contacts');
    await expect(page.getByText('Select a contact')).toBeVisible();
  });

  test('navigates to Messages by url', async ({ page }) => {
    await page.goto('/#/mymessages');
    await expect(page.locator('table').getByText('Sender')).toBeVisible();
    await expect(page.locator('table').getByText('Subject')).toBeVisible();
  });

  test('can send a message', async ({ page }) => {
    await page.goto('/#/mymessages');
    await expect(page).toHaveURL(/#\/mymessages\/inbox/);

    await page.getByText('New Message').click();
    await expect(page).toHaveURL(/#\/mymessages\/compose/);

    await page.locator('input#to').fill('somebody@somewhere.com');
    await page.locator('input#subject').fill('Hello World');
    await page
      .locator('textarea#body')
      .fill('The quick brown fox jumps over the lazy dog');
    await page.getByRole('button', { name: 'Send' }).click();

    await expect(page.getByText('Sender')).toBeVisible();
    await page.locator('li a').getByText('sent').click();
    await expect(page.locator('table').getByText('Hello World')).toBeVisible();
    await expect(
      page.locator('table').getByText('somebody@somewhere.com')
    ).toBeVisible();
  });

  test('can save a draft', async ({ page }) => {
    await page.goto('/#/mymessages');
    await expect(page).toHaveURL(/#\/mymessages\/inbox/);

    await page.getByText('New Message').click();
    await page.locator('input#to').fill('somebody@somewhere.com');
    await page.locator('input#subject').fill('Hello World');
    await page
      .locator('textarea#body')
      .fill('The quick brown fox jumps over the lazy dog');
    await page.getByRole('button', { name: 'Draft' }).click();

    await expect(page.getByText('Sender')).toBeVisible();
    await page.locator('li a').getByText('drafts').click();
    await expect(page.locator('table').getByText('Hello World')).toBeVisible();
    await expect(
      page.locator('table').getByText('somebody@somewhere.com')
    ).toBeVisible();
  });

  test('prompts to save a message being composed', async ({ page }) => {
    await page.goto('/#/mymessages');
    await expect(page).toHaveURL(/#\/mymessages\/inbox/);

    await page.getByText('New Message').click();
    await page.locator('input#to').fill('somebody@somewhere.com');
    await page.getByRole('button', { name: 'Cancel' }).click();

    await expect(page.locator('.backdrop')).toBeVisible();
    await expect(page.getByText('Navigate away')).toBeVisible();
    await page.getByRole('button', { name: 'No' }).click();
    await expect(page.locator('.backdrop')).not.toBeVisible();
    await expect(page).toHaveURL(/#\/mymessages\/compose/);

    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(page.locator('.backdrop')).toBeVisible();
    await expect(page.getByText('Navigate away')).toBeVisible();
    await page.getByRole('button', { name: 'Yes' }).click();
    await expect(page.locator('.backdrop')).not.toBeVisible();

    await expect(page.getByText('Sender')).toBeVisible();
    await expect(page.getByText('Subject')).toBeVisible();
    await expect(page).toHaveURL(/#\/mymessages\/inbox/);
  });

  test('navigates through folders', async ({ page }) => {
    await page.goto('/#/mymessages');
    await expect(page).toHaveURL(/#\/mymessages\/inbox/);

    await expect(page.locator('li.selected').getByText('inbox')).toBeVisible();
    await expect(page.getByText('Longer in style')).toBeVisible();

    await page.getByText('finance').click();
    await expect(
      page.locator('li.selected').getByText('finance')
    ).toBeVisible();
    await expect(page.getByText('You look angerly')).toBeVisible();
    await expect(page).toHaveURL(/#\/mymessages\/finance/);

    await page.getByText('travel').click();
    await expect(page.locator('li.selected').getByText('travel')).toBeVisible();
    await expect(page.getByText('In areas of lush forest')).toBeVisible();
    await expect(page).toHaveURL(/#\/mymessages\/travel/);

    await page.getByText('personal').click();
    await expect(
      page.locator('li.selected').getByText('personal')
    ).toBeVisible();
    await expect(page.getByText('Mother is not all')).toBeVisible();
    await expect(page).toHaveURL(/#\/mymessages\/personal/);
  });

  test('navigates through messages', async ({ page }) => {
    const selectMessage = async (subject, guid) => {
      await page.getByText(subject).click();
      await expect(page).toHaveURL(new RegExp(guid));
      await expect(
        page.locator('.message h4').getByText(subject)
      ).toBeVisible();
    };

    await page.goto('/#/mymessages/finance');
    await expect(
      page.locator('li.selected').getByText('finance')
    ).toBeVisible();

    await selectMessage('You look angerly', '5648b50cf8ea6dfc7d1a40a8');
    await selectMessage(
      'Historical change consequent',
      '5648b50c66b80016c9acc467'
    );
    await selectMessage('The gracious Duncan', '5648b50d05f033d24fe5a1a2');
    await selectMessage('Rings, does not die', '5648b50c8e0e098cef934e04');
  });

  test('navigates through contacts', async ({ page }) => {
    await page.goto('/#/contacts');

    const selectContact = async (name, id) => {
      await page.locator('li').getByText(name).click();
      await expect(page).toHaveURL(new RegExp(id));
      await expect(page.locator('a.selected').getByText(name)).toBeVisible();
      await expect(page.locator('.contact h3').getByText(name)).toBeVisible();
    };

    await selectContact('Rios Sears', 'rsears');
    await selectContact('Delia Hunter', 'dhunter');
    await selectContact('Underwood Owens', 'uowens');
  });
});
