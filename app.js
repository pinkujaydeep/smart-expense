const $=s=>document.querySelector(s);
const state={salary:0,expenses:[{name:'Rent / Home',amount:0},{name:'Groceries',amount:0},{name:'Utilities',amount:0},{name:'EMI / Debt',amount:0}]};
const money=n=>'₹'+Math.round(Math.max(0,n)).toLocaleString('en-IN');
function render(){
  $('#salary').value=state.salary||'';
  const list=$('#expenseList'); list.innerHTML='';
  state.expenses.forEach((e,i)=>{
    const row=document.createElement('div'); row.className='expense';
    row.innerHTML=`<input aria-label="Expense name" value="${e.name}"><input aria-label="Expense amount" type="number" min="0" value="${e.amount||''}" placeholder="₹"><button class="remove" type="button" aria-label="Remove expense">×</button>`;
    const [name,amt,remove]=row.children;
    name.addEventListener('input',()=>{e.name=name.value;update()});
    amt.addEventListener('input',()=>{e.amount=Math.max(0,Number(amt.value)||0);update()});
    remove.addEventListener('click',()=>{state.expenses.splice(i,1);render()});
    list.appendChild(row);
  });
  update();
}
function update(){
  state.salary=Math.max(0,Number($('#salary').value)||0);
  const total=state.expenses.reduce((s,e)=>s+Math.max(0,Number(e.amount)||0),0);
  const left=Math.max(0,state.salary-total), pct=state.salary?Math.min(100,total/state.salary*100):0;
  $('#remaining').textContent=money(left); $('#salaryOut').textContent=money(state.salary); $('#expenseOut').textContent=money(total);
  $('#spentPct').textContent=Math.round(pct)+'%'; $('#progressBar').style.width=pct+'%';
  const needs=Math.min(left,left*.5), goals=left*.3, free=Math.max(0,left-needs-goals);
  $('#needs').textContent=money(needs); $('#goals').textContent=money(goals); $('#free').textContent=money(free);
  const tips=[];
  if(!state.salary) tips.push('Start with your take-home salary.');
  else if(total>state.salary) tips.push('Your planned expenses exceed salary. Reduce flexible expenses first.');
  else if(pct>70) tips.push('More than 70% of salary is already committed. Keep new discretionary spending low.');
  else tips.push('You have room to split the balance between goals, needs and guilt-free spending.');
  if(left>0 && state.salary) tips.push(`A ₹${Math.round(left*.3).toLocaleString('en-IN')} goal allocation gives you a simple savings target.`);
  const emi=state.expenses.find(e=>/emi|debt/i.test(e.name));
  if(emi&&emi.amount>state.salary*.3) tips.push('Debt is above 30% of salary; consider reviewing the repayment plan.');
  $('#tips').innerHTML=tips.map(t=>`<li>${t}</li>`).join('');
  $('#smartText').textContent=state.salary?`Based on your current plan, ${money(left)} is still unassigned this month.`:'Enter your salary and expenses to get a personalized allocation.';
}
$('#salary').addEventListener('input',update);
$('#addExpense').addEventListener('click',()=>{state.expenses.push({name:'New expense',amount:0});render()});
document.querySelectorAll('[data-add]').forEach(b=>b.addEventListener('click',()=>{state.expenses.push({name:b.dataset.add,amount:0});render()}));
$('#resetBtn').addEventListener('click',()=>{state.salary=0;state.expenses=[{name:'Rent / Home',amount:0},{name:'Groceries',amount:0},{name:'Utilities',amount:0},{name:'EMI / Debt',amount:0}];render()});
if('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(()=>{});
render();
