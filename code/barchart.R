## Collecting data for the making of a 
## simple bar-graph of the activity on CKAN.
## This script is configured to run at a certain amount of time.
library(rjson)
library(RCurl)
library(reshape2)

# sw deploy function
onSw <- function(d = T, b = '~/tool/') {
  if (d == T) return(b)
  else return('')
}

# Helper functions
source(paste0(onSw(), 'code/write_tables.R'))

# Function to calculate the bar-graph
calculateBarGraph <- function(l = 1) {
  # url to query
  url = paste0('https://data.hdx.rwlabs.org/api/action/recently_changed_packages_activity_list?limit=', l)
  doc = fromJSON(getURL(url))
  
  # parsing results
  total = length(doc$result)
  pb <- txtProgressBar(min = 0, max = total, style = 3, char = ".")
  for (i in 1:total) {
    setTxtProgressBar(pb, i)
    it <- data.frame(dataset_name = doc$result[[i]]$data$package$name,
                     timestamp = as.POSIXct(doc$result[[i]]$timestamp),
                     activity_type = doc$result[[i]]$activity_type)
                     
    # building data.frame
    if (i == 1) out <- it
    else out <- rbind(out, it)
  }
  
  # results
  return(out)
}

# collecting data
data <- calculateBarGraph(l = 20000)

# casting into chart shape
totals <- data.frame(table(data$timestamp, data$activity_type))
names(totals) <- c('date', 'variable', 'frequency')
out <- dcast(totals, date ~ variable)

# Sotoring output
writeTables(out, 'chages_type', 'scraperwiki')