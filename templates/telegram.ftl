<#assign statusTexts = {
  "passed": "✅ Успешно",
  "failed": "❌ Упало",
  "broken": "⚠️ Сломано",
  "skipped": "⏩ Пропущено",
  "unknown": "❓ Неизвестно"
}>

<b>${base.project} (${base.environment})</b>
<#list summary.statistic as status, count>
${statusTexts[status]?default("📊 " + status)}: ${count}
</#list>
<#if base.comment?has_content>
${base.comment}
</#if>