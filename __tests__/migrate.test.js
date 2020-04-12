const transform = require('../migrate');

describe('#transform JavaScript', () => {
  it("Scenario('title', (I) => {})", () => {
    const source = `
    Feature('PageObject');
  
  Scenario('@ClassPageObject', (I) => {
    classpage.type('Class Page Type');
    classpage.purgeDomains();
  });
    `;
    expect(transform({ source })).toContain('Scenario(\'@ClassPageObject\', ({ I })');
  });

  it("Scenario('title', function (I) {})", () => {
    const source = `
    Feature('PageObject');
  
  Scenario('@ClassPageObject', function (I) {
    classpage.type('Class Page Type');
    classpage.purgeDomains();
  });
    `;
    expect(transform({ source })).toContain('Scenario(\'@ClassPageObject\', function ({ I })');
  });

  it("Double Scenario('title', (I) => {})", () => {
    const source = `
    Feature('PageObject');
  
  Scenario('@ClassPageObject', (I) => {
    classpage.type('Class Page Type');
    classpage.purgeDomains();
  });

  Scenario('@ClassPageObject - 2', (I) => {
    classpage.type('Class Page Type');
    classpage.purgeDomains();
  });
    `;
    const result = transform({ source });
    expect(result).toContain('Scenario(\'@ClassPageObject\', ({ I })');
    expect(result).toContain('Scenario(\'@ClassPageObject - 2\', ({ I })');
  });

  it("Scenario('title', (I, pageObject) => {})", () => {
    const source = `
    Feature('PageObject');
  
  Scenario('@ClassPageObject', (I, classpage) => {
    classpage.type('Class Page Type');
    classpage.purgeDomains();
  });
    `;
    expect(transform({ source })).toContain('Scenario(\'@ClassPageObject\', ({ I, classpage })');
  });

  it("Scenario('title', async (I, pageObject) => {})", () => {
    const source = `
    Feature('PageObject');
  
  Scenario('@ClassPageObject', async (I, classpage) => {
    await classpage.type('Class Page Type');
    await classpage.purgeDomains();
  });
    `;
    expect(transform({ source })).toContain('Scenario(\'@ClassPageObject\', async ({ I, classpage })');
  });

  it('Scenario("title", { retries: 2 } , async (I, classpage) => {})', () => {
    const source = `
    Feature('PageObject');
  
  Scenario('@ClassPageObject', async (I, classpage) => {
    await classpage.type('Class Page Type');
    await classpage.purgeDomains();
  });
    `;
    expect(transform({ source })).toContain('Scenario(\'@ClassPageObject\', async ({ I, classpage })');
  });
  it('Scenario("title", async () => {})', () => {
    const source = `
    Feature('PageObject');
  
  Scenario('@ClassPageObject', async () => {
    await classpage.type('Class Page Type');
    await classpage.purgeDomains();
  });
    `;
    expect(transform({ source })).toContain('Scenario(\'@ClassPageObject\', async ()');
  });
  it('Scenario("title", () => {})', () => {
    const source = `
    Feature('PageObject');
  
  Scenario('@ClassPageObject', () => {
    classpage.type('Class Page Type');
    classpage.purgeDomains();
  });
    `;
    expect(transform({ source })).toContain('Scenario(\'@ClassPageObject\', ()');
  });

  it('Scenario.skip("title", (I, classpage) => {})', () => {
    const source = `
    Feature('PageObject');
  
  Scenario.skip('@ClassPageObject', (I, classpage) => {
    classpage.type('Class Page Type');
    classpage.purgeDomains();
  });
    `;
    expect(transform({ source })).toContain('Scenario.skip(\'@ClassPageObject\', ({ I, classpage })');
  });

  it('Scenario.only("title", (I, classpage) => {})', () => {
    const source = `
    Feature('PageObject');
  
  Scenario.only('@ClassPageObject', (I, classpage) => {
    classpage.type('Class Page Type');
    classpage.purgeDomains();
  });
    `;
    expect(transform({ source })).toContain('Scenario.only(\'@ClassPageObject\', ({ I, classpage })');
  });

  it('Scenario.todo("title", (I, classpage) => {})', () => {
    const source = `
    Feature('PageObject');
  
  Scenario.todo('@ClassPageObject', (I, classpage) => {
    classpage.type('Class Page Type');
    classpage.purgeDomains();
  });
    `;
    expect(transform({ source })).toContain('Scenario.todo(\'@ClassPageObject\', ({ I, classpage })');
  });

  it('Mix with it and Scenario.skip("title", (I, classpage) => {})', () => {
    const source = `
    Feature('PageObject');
  
  Scenario.skip('@ClassPageObject', (I, classpage) => {
    classpage.type('Class Page Type');
    classpage.purgeDomains();
  });

  it.skip('@ClassPageObject - 2', (I, classpage) => {
    classpage.type('Class Page Type');
    classpage.purgeDomains();
  });
    `;
    const result = transform({ source });
    expect(result).toContain('Scenario.skip(\'@ClassPageObject\', ({ I, classpage })');
    expect(result).toContain('it.skip(\'@ClassPageObject - 2\', (I, classpage)');
  });

  it('xScenario("title", (I, classpage) => {})', () => {
    const source = `
    Feature('PageObject');
  
  xScenario('@ClassPageObject', (I, classpage) => {
    classpage.type('Class Page Type');
    classpage.purgeDomains();
  });
    `;
    expect(transform({ source })).toContain('xScenario(\'@ClassPageObject\', ({ I, classpage })');
  });

  it('mix xScenario("title", (I, classpage) => {})', () => {
    const source = `
    Feature('PageObject');
  
    xScenario('@ClassPageObject', (I, classpage) => {
      classpage.type('Class Page Type');
      classpage.purgeDomains();
    });

    Scenario('@ClassPageObject - 2', (I, classpage) => {
      classpage.type('Class Page Type');
      classpage.purgeDomains();
    });
    `;
    const result = transform({ source });
    expect(result).toContain('xScenario(\'@ClassPageObject\', ({ I, classpage })');
    expect(result).toContain('Scenario(\'@ClassPageObject - 2\', ({ I, classpage })');
  });

  it("Data(accounts).Scenario('title', (I, pageObject, current) => {})", () => {
    const source = `
    let accounts = new DataTable(['login', 'password']);
    accounts.add(['davert', '123456']);

    Feature('PageObject');
  
    Data(accounts).Scenario('@ClassPageObject', (I, classpage, current) => {
      classpage.type('Class Page Type');
      classpage.purgeDomains();
    });
    `;
    expect(transform({ source })).toContain('Scenario(\'@ClassPageObject\', ({ I, classpage, current })');
  });

  it("Mix Data(accounts).Scenario('title', (I, pageObject, current) => {})", () => {
    const source = `
    let accounts = new DataTable(['login', 'password']);
    accounts.add(['davert', '123456']);

    Feature('PageObject');
    
    Scenario('@ClassPageObject', (I) => {
      classpage.type('Class Page Type');
      classpage.purgeDomains();
    });

    Data(accounts).Scenario('@ClassPageObject - 2', (I, classpage, current) => {
      classpage.type('Class Page Type');
      classpage.purgeDomains();
    });
    `;
    const result = transform({ source });
    expect(result).toContain('Scenario(\'@ClassPageObject\', ({ I })');
    expect(result).toContain('Data(accounts).Scenario(\'@ClassPageObject - 2\', ({ I, classpage, current })');
  });

  it("Data(accounts).Scenario('title', async (I, pageObject, current) => {})", () => {
    const source = `
    let accounts = new DataTable(['login', 'password']);
    accounts.add(['davert', '123456']);

    Feature('PageObject');
  
    Data(accounts).Scenario('@ClassPageObject', async (I, classpage, current) => {
      classpage.type('Class Page Type');
      classpage.purgeDomains();
    });
    `;
    expect(transform({ source })).toContain('Scenario(\'@ClassPageObject\', async ({ I, classpage, current })');
  });

  it("Double Data(accounts).Scenario('title', async (I, pageObject, current) => {})", () => {
    const source = `
    let accounts = new DataTable(['login', 'password']);
    accounts.add(['davert', '123456']);

    Feature('PageObject');
  
    Data(accounts).Scenario('@ClassPageObject', async (I, classpage, current) => {
      classpage.type('Class Page Type');
      classpage.purgeDomains();
    });

    Data(accounts).Scenario('@ClassPageObject - 2', async (I, classpage, current) => {
      classpage.type('Class Page Type');
      classpage.purgeDomains();
    });
    `;
    const result = transform({ source });
    expect(result).toContain('Data(accounts).Scenario(\'@ClassPageObject\', async ({ I, classpage, current })');
    expect(result).toContain('Data(accounts).Scenario(\'@ClassPageObject - 2\', async ({ I, classpage, current })');
  });

  it("Data(accounts).Scenario('title', { retries: 2 } , (I, pageObject, current) => {})", () => {
    const source = `
    let accounts = new DataTable(['login', 'password']);
    accounts.add(['davert', '123456']);

    Feature('PageObject');
  
    Data(accounts).Scenario('@ClassPageObject', { retries: 2 } , (I, classpage, current) => {
      classpage.type('Class Page Type');
      classpage.purgeDomains();
    });
    `;
    expect(transform({ source })).toContain('Scenario(\'@ClassPageObject\', { retries: 2 } , ({ I, classpage, current })');
  });
});

describe('#transform TypeScript', () => {
  it("Scenario('title', (I, pageObject) => {})", () => {
    const source = `
    Feature('PageObject');
  
  Scenario('@ClassPageObject', (I: CodeceptJS.I, classpage: CodeceptJS.classpage) => {
    classpage.type('Class Page Type');
    classpage.purgeDomains();
  });

  Scenario('@ClassPageObject', async (I: ICodeceptInjected['I'], classpage: ICodeceptInjected['classpage']) => {
    classpage.type('Class Page Type');
    classpage.purgeDomains();
  });

  Data(accounts).Scenario('@ClassPageObject', (I: CodeceptJS.I, classpage: CodeceptJS.classpage, current: any) => {
    classpage.type('Class Page Type');
    classpage.purgeDomains();
  });
    `;
    const result = transform({ source }, null, {
      parser: require('recast/parsers/typescript'),
    });
    expect(result).toContain('Scenario(\'@ClassPageObject\', ({ I, classpage })');
    expect(result).toContain('Scenario(\'@ClassPageObject\', async ({ I, classpage })');
    expect(result).toContain('Data(accounts).Scenario(\'@ClassPageObject\', ({ I, classpage, current })');
  });
});
