$(document).ready(init)

function init() {
  $('#add').click(addButtonClicked);
  let studentNames = namesFromStorage();
  let $lis = studentNames.map(name => createNameList(name));
  $('#list').append($lis);
  $('#selectOne').click(pickOne);
  $('#selectTeam').click(pickTeam);
  $('#list').on('dblclick', 'li', removeName);
}

function addButtonClicked() {
  let $input = $('#name');
  let name = $input.val();
  $input.val('');

  let $li = createNameList(name);
  let $list = $('#list');
  $list.append($li);

  // let color = $('#color').val();
  // let $li = $('<li>');
  // $li.text(name).css('color', color);
  //
  // let $list = $('#list');
  // $list.append($li);

  addToStorage(name);
}

function createNameList(name) {
  let $li = $('<li>');
  $li.text(name);
  return $li;
}

function addToStorage(name) {
  let studentNames = namesFromStorage();
  studentNames.push(name);
  writeToStorage(studentNames);
}

function namesFromStorage() {
  let json = localStorage.studentNames;
  let studentNames;
  try{
    studentNames = JSON.parse(json);
  }catch(e){
    studentNames = [];
  }
  return studentNames;
}

function writeToStorage(studentNames) {
  localStorage.studentNames = JSON.stringify(studentNames);
}

function pickOne() {
  let json = localStorage.studentNames;
  let studentNames = JSON.parse(json);
  let index = Math.floor(Math.random()*studentNames.length);
  let $h3 = $('#pickOneStudent');
  $h3.text(studentNames[index]);
}

function pickTeam() {
  let json = localStorage.studentNames;
  let studentNames = JSON.parse(json);
  let $teamInput = $('#teamNumber');
  let number = $teamInput.val();
  let newStudentArr = [];

  for(let i = 0, len = studentNames.length; i < len; i++){
    let index = Math.floor(Math.random() * studentNames.length);
    newStudentArr[i] = studentNames[index];
    studentNames.splice(index, 1);
  }

  var group = [];
  for( let j = 0; j < newStudentArr.length; j+= +number ) {
    group.push(newStudentArr.slice(j, j+ +number));
  }

  let teams = group.map((team, index) => {
    let $ul = createGroupList(team);
    let $groupList = $('#groupList');
    let $h3 = $('<h3>'+'group'+(index+1)+'</h3>');
    $groupList.append($h3);
    $groupList.append($ul);
    return team;
  })
}

function createGroupList(team) {
  return team.map(name => {
    let $li = $('<li>');
    $li.text(name);
    return $li;
  })
}

function removeName() {
  let index = $(this).index();
  removeFromStorage(index);
  $(this).remove();
}

function removeFromStorage(index) {
  let names = namesFromStorage();
  names.splice(index, 1);
  writeToStorage(names);
}
