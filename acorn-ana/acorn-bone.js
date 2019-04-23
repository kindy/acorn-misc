
class Parser {
  parseExpressionAt() {
    this.parseExpression();
  }

  parseTopLevel() {
    this.parseStatement();
    ("Program");
  }

  parseStatement() {
    this.parseBreakContinueStatement();
    this.parseDebuggerStatement();
    this.parseDoStatement();
    this.parseForStatement();
    this.parseFunctionStatement();
    this.parseClass();
    this.parseIfStatement();
    this.parseReturnStatement();
    this.parseSwitchStatement();
    this.parseThrowStatement();
    this.parseTryStatement();
    this.parseVarStatement();
    this.parseWhileStatement();
    this.parseWithStatement();
    this.parseBlock();
    this.parseEmptyStatement();
    this.parseImport();
    this.parseExport();
    this.parseFunctionStatement();
    this.parseExpression();
    this.parseLabeledStatement();
    this.parseExpressionStatement();
  }

  parseBreakContinueStatement() {
    this.parseIdent();
    (isBreak ? "BreakStatement" : "ContinueStatement");
  }

  parseDebuggerStatement() {
    ("DebuggerStatement");
  }

  parseDoStatement() {
    this.parseStatement();
    this.parseParenExpression();
    ("DoWhileStatement");
  }

  parseForStatement() {
    this.parseFor();
    this.parseVar();
    ("VariableDeclaration");
    this.parseForIn();
    this.parseFor();
    this.parseExpression();
    this.parseForIn();
    this.parseFor();
  }

  parseFunctionStatement() {
    this.parseFunction();
  }

  parseIfStatement() {
    this.parseParenExpression();
    this.parseStatement();
    this.parseStatement();
    ("IfStatement");
  }

  parseReturnStatement() {
    this.parseExpression();
    ("ReturnStatement");
  }

  parseSwitchStatement() {
    this.parseParenExpression();
    this.parseExpression();
    this.parseStatement();
    ("SwitchCase");
    ("SwitchStatement");
  }

  parseThrowStatement() {
    this.parseExpression();
    ("ThrowStatement");
  }

  parseTryStatement() {
    this.parseBlock();
    this.parseBindingAtom();
    this.parseBlock();
    ("CatchClause");
    this.parseBlock();
    ("TryStatement");
  }

  parseVarStatement() {
    this.parseVar();
    ("VariableDeclaration");
  }

  parseWhileStatement() {
    this.parseParenExpression();
    this.parseStatement();
    ("WhileStatement");
  }

  parseWithStatement() {
    this.parseParenExpression();
    this.parseStatement();
    ("WithStatement");
  }

  parseEmptyStatement() {
    ("EmptyStatement");
  }

  parseLabeledStatement() {
    this.parseStatement();
    ("LabeledStatement");
  }

  parseExpressionStatement() {
    ("ExpressionStatement");
  }

  parseBlock() {
    this.parseStatement();
    ("BlockStatement");
  }

  parseFor() {
    this.parseExpression();
    this.parseExpression();
    this.parseStatement();
    ("ForStatement");
  }

  parseForIn() {
    this.parseExpression();
    this.parseMaybeAssign();
    this.parseStatement();
    (type);
  }

  parseVar() {
    this.parseVarId();
    this.parseMaybeAssign();
  }

  parseVarId() {
    this.parseBindingAtom();
  }

  parseFunction() {
    this.parseIdent();
    this.parseIdent();
    this.parseFunctionParams();
    this.parseFunctionBody();
    (statement & FUNC_STATEMENT ? "FunctionDeclaration" : "FunctionExpression");
  }

  parseFunctionParams() {
    this.parseBindingList();
  }

  parseClass() {
    this.parseClassId();
    this.parseClassSuper();
    this.parseClassElement();
    ("ClassBody");
    (isStatement ? "ClassDeclaration" : "ClassExpression");
  }

  parseClassElement() {
    this.parsePropertyName();
    this.parseClassMethod();
  }

  parseClassMethod() {
    this.parseMethod();
    ("MethodDefinition");
  }

  parseClassId() {
    this.parseIdent();
  }

  parseClassSuper() {
    this.parseExprSubscripts();
  }

  parseExport() {
    this.parseExprAtom();
    ("ExportAllDeclaration");
    this.parseFunction();
    this.parseClass();
    this.parseMaybeAssign();
    ("ExportDefaultDeclaration");
    this.parseStatement();
    this.parseExportSpecifiers();
    this.parseExprAtom();
    ("ExportNamedDeclaration");
  }

  parseExportSpecifiers() {
    this.parseIdent();
    this.parseIdent();
  }

  parseImport() {
    this.parseExprAtom();
    this.parseImportSpecifiers();
    this.parseExprAtom();
    ("ImportDeclaration");
  }

  parseImportSpecifiers() {
    this.parseIdent();
    ("ImportDefaultSpecifier");
    this.parseIdent();
    ("ImportNamespaceSpecifier");
    this.parseIdent();
    this.parseIdent();
  }

  parseSpread() {
    this.parseMaybeAssign();
    ("SpreadElement");
  }

  parseRestBinding() {
    this.parseBindingAtom();
    ("RestElement");
  }

  parseBindingAtom() {
    this.parseBindingList();
    ("ArrayPattern");
    this.parseObj();
    this.parseIdent();
  }

  parseBindingList() {
    this.parseRestBinding();
    this.parseBindingListItem();
    this.parseMaybeDefault();
    this.parseBindingListItem();
  }

  parseBindingListItem() {

  }

  parseMaybeDefault() {
    this.parseBindingAtom();
    this.parseMaybeAssign();
    ("AssignmentPattern");
  }

  parseExpression() {
    this.parseMaybeAssign();
    this.parseMaybeAssign();
    ("SequenceExpression");
  }

  parseMaybeAssign() {
    this.parseYield();
    this.parseMaybeConditional();
    this.parseMaybeAssign();
    ("AssignmentExpression");
  }

  parseMaybeConditional() {
    this.parseExprOps();
    this.parseMaybeAssign();
    this.parseMaybeAssign();
    ("ConditionalExpression");
  }

  parseExprOps() {
    this.parseMaybeUnary();
    this.parseExprOp();
  }

  parseExprOp() {
    this.parseExprOp();
    this.parseMaybeUnary();
    this.parseExprOp();
  }

  parseMaybeUnary() {
    this.parseAwait();
    this.parseMaybeUnary();
    (update ? "UpdateExpression" : "UnaryExpression");
    this.parseExprSubscripts();
    this.parseMaybeUnary();
  }

  parseExprSubscripts() {
    this.parseExprAtom();
    this.parseSubscripts();
  }

  parseSubscripts() {
    this.parseSubscript();
  }

  parseSubscript() {
    this.parseExpression();
    this.parseIdent();
    ("MemberExpression");
    this.parseExprList();
    this.parseArrowExpression();
    ("CallExpression");
    this.parseTemplate();
    ("TaggedTemplateExpression");
  }

  parseExprAtom() {
    ("Super");
    ("ThisExpression");
    this.parseIdent();
    this.parseFunction();
    this.parseArrowExpression();
    this.parseIdent();
    this.parseArrowExpression();
    this.parseLiteral();
    this.parseLiteral();
    ("Literal");
    this.parseParenAndDistinguishExpression();
    this.parseExprList();
    ("ArrayExpression");
    this.parseObj();
    this.parseFunction();
    this.parseClass();
    this.parseNew();
    this.parseTemplate();
  }

  parseLiteral() {
    ("Literal");
  }

  parseParenExpression() {
    this.parseExpression();
  }

  parseParenAndDistinguishExpression() {
    this.parseParenItem();
    this.parseRestBinding();
    this.parseMaybeAssign();
    this.parseParenArrowList();
    this.parseParenExpression();
    ("ParenthesizedExpression");
  }

  parseParenItem() {

  }

  parseParenArrowList() {
    this.parseArrowExpression();
  }

  parseNew() {
    this.parseIdent();
    this.parseIdent();
    ("MetaProperty");
    this.parseSubscripts();
    this.parseExprAtom();
    this.parseExprList();
    ("NewExpression");
  }

  parseTemplateElement() {
    ("TemplateElement");
  }

  parseTemplate() {
    this.parseTemplateElement();
    this.parseExpression();
    this.parseTemplateElement();
    ("TemplateLiteral");
  }

  parseObj() {
    this.parseProperty();
    (isPattern ? "ObjectPattern" : "ObjectExpression");
  }

  parseProperty() {
    this.parseIdent();
    ("RestElement");
    this.parseMaybeAssign();
    ("SpreadElement");
    this.parsePropertyName();
    this.parsePropertyName();
    this.parsePropertyValue();
    ("Property");
  }

  parsePropertyValue() {
    this.parseMaybeDefault();
    this.parseMaybeAssign();
    this.parseMethod();
    this.parsePropertyName();
    this.parseMethod();
    this.parseMaybeDefault();
    this.parseMaybeDefault();
  }

  parsePropertyName() {
    this.parseMaybeAssign();
    this.parseExprAtom();
    this.parseIdent();
  }

  parseMethod() {
    this.parseBindingList();
    this.parseFunctionBody();
    ("FunctionExpression");
  }

  parseArrowExpression() {
    this.parseFunctionBody();
    ("ArrowFunctionExpression");
  }

  parseFunctionBody() {
    this.parseMaybeAssign();
    this.parseBlock();
  }

  parseExprList() {
    this.parseSpread();
    this.parseMaybeAssign();
  }

  parseIdent() {
    ("Identifier");
  }

  parseYield() {
    this.parseMaybeAssign();
    ("YieldExpression");
  }

  parseAwait() {
    this.parseMaybeUnary();
    ("AwaitExpression");
  }

}

