import {
  test,
  moduleFor
} from 'safe-tube/tests/helpers/module_for';

import Index from 'safe-tube/routes/index';

moduleFor('route:index', "Unit - IndexRoute");

test("it exists", function(){
  ok(this.subject() instanceof Index);
});

test("#model", function(){
  deepEqual(this.subject().model(), ['red', 'yellow', 'blue']);
});
